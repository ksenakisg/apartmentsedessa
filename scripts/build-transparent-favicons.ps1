$ErrorActionPreference = "Stop"
$Root = Split-Path $PSScriptRoot -Parent

$SrcCandidates = @(
  (Join-Path $Root "assets\logo-source-transparent.png"),
  (Join-Path $Root "assets\central-riverfront-logo.png")
)
$Src = $SrcCandidates | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $Src) {
  throw "No source logo found in assets/"
}

Add-Type -AssemblyName System.Drawing

function Test-IsLogoPixel([System.Drawing.Color]$c) {
  $r = $c.R; $g = $c.G; $b = $c.B
  if ($r -lt 40 -and $g -lt 40 -and $b -lt 40) { return $false }
  if ($r -gt 215 -and $g -gt 215 -and $b -gt 215) { return $false }
  if ($b -gt $r + 8 -and $b -gt $g + 4) { return $true }
  return $false
}

function Convert-ToTransparentColor([System.Drawing.Color]$c) {
  $r = $c.R; $g = $c.G; $b = $c.B

  if ($r -gt 215 -and $g -gt 215 -and $b -gt 215) {
    return [System.Drawing.Color]::FromArgb(0, 0, 0, 0)
  }
  if ($r -lt 40 -and $g -lt 40 -and $b -lt 40) {
    return [System.Drawing.Color]::FromArgb(0, 0, 0, 0)
  }
  if ($b -gt $r + 8 -and $b -gt $g + 4 -and $b -ge 80) {
    return [System.Drawing.Color]::FromArgb(255, $r, $g, $b)
  }
  if ($b -gt $r -and $b -gt $g) {
    $max = [Math]::Max($r, [Math]::Max($g, $b))
    $alpha = [int][Math]::Min(255, [Math]::Max(0, ($max - 25) * 255 / 120))
    if ($alpha -le 8) { return [System.Drawing.Color]::FromArgb(0, 0, 0, 0) }
    return [System.Drawing.Color]::FromArgb($alpha, $r, $g, $b)
  }
  return [System.Drawing.Color]::FromArgb(0, 0, 0, 0)
}

function New-TransparentMaster([string]$path) {
  $src = [System.Drawing.Bitmap]::FromFile((Resolve-Path $path))
  $w = $src.Width
  $h = $src.Height
  $minX = $w; $minY = $h; $maxX = 0; $maxY = 0

  for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
      $out = Convert-ToTransparentColor($src.GetPixel($x, $y))
      if ($out.A -gt 12) {
        if ($x -lt $minX) { $minX = $x }
        if ($y -lt $minY) { $minY = $y }
        if ($x -gt $maxX) { $maxX = $x }
        if ($y -gt $maxY) { $maxY = $y }
      }
    }
  }

  if ($maxX -lt $minX) { throw "No logo pixels detected in $path" }

  $cropW = $maxX - $minX + 1
  $cropH = $maxY - $minY + 1
  $cropped = New-Object System.Drawing.Bitmap $cropW, $cropH, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  for ($y = 0; $y -lt $cropH; $y++) {
    for ($x = 0; $x -lt $cropW; $x++) {
      $cropped.SetPixel($x, $y, (Convert-ToTransparentColor($src.GetPixel($minX + $x, $minY + $y))))
    }
  }
  $src.Dispose()
  return $cropped
}

function Save-PngSize([System.Drawing.Bitmap]$master, [int]$size, [string]$outPath) {
  $bmp = New-Object System.Drawing.Bitmap $size, $size, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $g.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
  $g.Clear([System.Drawing.Color]::Transparent)
  $g.DrawImage($master, 0, 0, $size, $size)
  $g.Dispose()
  $dir = Split-Path $outPath -Parent
  if ($dir -and -not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
  $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  Write-Host "Wrote $outPath ($size px, transparent)"
}

function Write-FaviconSvg([System.Drawing.Bitmap]$master, [string]$outPath) {
  $embedSize = 128
  $tmp = Join-Path $env:TEMP ("crr-favicon-svg-src-{0}.png" -f [Guid]::NewGuid().ToString("N"))
  Save-PngSize $master $embedSize $tmp
  $bytes = [System.IO.File]::ReadAllBytes($tmp)
  Remove-Item $tmp -Force
  $b64 = [Convert]::ToBase64String($bytes)
  $svg = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 $embedSize $embedSize" role="img" aria-label="Central and Riverfront Apartments">
  <image width="$embedSize" height="$embedSize" href="data:image/png;base64,$b64"/>
</svg>
"@
  [System.IO.File]::WriteAllText($outPath, $svg, [System.Text.UTF8Encoding]::new($false))
  Write-Host "Wrote $outPath (SVG, transparent, ${embedSize}px embedded)"
}

function Write-FaviconIco([string]$pngPath, [string]$icoPath) {
  $png = [System.IO.File]::ReadAllBytes($pngPath)
  $header = [byte[]](0, 0, 1, 0, 1, 0)
  $entry = New-Object byte[] 16
  $entry[0] = 48
  $entry[1] = 48
  $entry[4] = 1
  $entry[6] = 32
  [BitConverter]::GetBytes([uint32]$png.Length).CopyTo($entry, 8)
  [BitConverter]::GetBytes([uint32]22).CopyTo($entry, 12)
  [System.IO.File]::WriteAllBytes($icoPath, $header + $entry + $png)
  Write-Host "Wrote $icoPath"
}

Write-Host "Processing source: $Src"
$master = New-TransparentMaster $Src

$masterPath = Join-Path $Root "assets\logo-transparent-master.png"
Save-PngSize $master 1024 $masterPath

Save-PngSize $master 512 (Join-Path $Root "assets\favicon-512.png")
Save-PngSize $master 180 (Join-Path $Root "apple-touch-icon.png")
Save-PngSize $master 180 (Join-Path $Root "assets\apple-touch-icon.png")
Save-PngSize $master 192 (Join-Path $Root "assets\android-chrome-192x192.png")
Save-PngSize $master 512 (Join-Path $Root "assets\android-chrome-512x512.png")
Save-PngSize $master 48  (Join-Path $Root "favicon.png")
Save-PngSize $master 48  (Join-Path $Root "favicon-48x48.png")
Save-PngSize $master 32  (Join-Path $Root "favicon-32x32.png")
Save-PngSize $master 16  (Join-Path $Root "favicon-16x16.png")
Save-PngSize $master 16  (Join-Path $Root "assets\favicon-16x16.png")
Save-PngSize $master 32  (Join-Path $Root "assets\favicon-32x32.png")
Save-PngSize $master 48  (Join-Path $Root "assets\favicon-48x48.png")

Write-FaviconSvg $master (Join-Path $Root "favicon.svg")
Write-FaviconIco (Join-Path $Root "favicon.png") (Join-Path $Root "favicon.ico")

$master.Dispose()
Write-Host "Transparent favicon assets generated."
