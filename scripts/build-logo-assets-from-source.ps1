$ErrorActionPreference = "Stop"
$Root = Split-Path $PSScriptRoot -Parent

$Src = Join-Path $Root "assets\central-riverfront-logo.png"
if (-not (Test-Path $Src)) {
  throw "Source logo not found: $Src"
}

Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile((Resolve-Path $Src))

function Save-PngSize($size, $outPath, [switch]$FitContain) {
  $bmp = New-Object System.Drawing.Bitmap $size, $size
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $g.Clear([System.Drawing.Color]::White)

  if ($FitContain) {
    $ratio = [Math]::Min($size / $img.Width, $size / $img.Height)
    $w = [int]($img.Width * $ratio)
    $h = [int]($img.Height * $ratio)
    $x = ($size - $w) / 2
    $y = ($size - $h) / 2
    $g.DrawImage($img, $x, $y, $w, $h)
  } else {
    $g.DrawImage($img, 0, 0, $size, $size)
  }

  $g.Dispose()
  $dir = Split-Path $outPath -Parent
  if ($dir -and -not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
  $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  Write-Host "Wrote $outPath ($size px)"
}

# Header-optimized sizes (aspect-fit inside square canvas)
Save-PngSize 96 (Join-Path $Root "assets\logo-96.png") -FitContain
Save-PngSize 48 (Join-Path $Root "assets\logo-48.png") -FitContain

# Favicons at site root
Save-PngSize 48 (Join-Path $Root "favicon.png") -FitContain
Save-PngSize 48 (Join-Path $Root "favicon-48x48.png") -FitContain
Save-PngSize 32 (Join-Path $Root "favicon-32x32.png") -FitContain
Save-PngSize 16 (Join-Path $Root "favicon-16x16.png") -FitContain
Save-PngSize 180 (Join-Path $Root "apple-touch-icon.png") -FitContain

# PWA / manifest icons
Save-PngSize 192 (Join-Path $Root "assets\android-chrome-192x192.png") -FitContain
Save-PngSize 512 (Join-Path $Root "assets\android-chrome-512x512.png") -FitContain

# Mirror common sizes under assets for consistency
Save-PngSize 16 (Join-Path $Root "assets\favicon-16x16.png") -FitContain
Save-PngSize 32 (Join-Path $Root "assets\favicon-32x32.png") -FitContain
Save-PngSize 48 (Join-Path $Root "assets\favicon-48x48.png") -FitContain
Save-PngSize 180 (Join-Path $Root "assets\apple-touch-icon.png") -FitContain

$png = [System.IO.File]::ReadAllBytes((Join-Path $Root "favicon.png"))
$header = [byte[]](0, 0, 1, 0, 1, 0)
$entry = New-Object byte[] 16
$entry[0] = 48
$entry[1] = 48
$entry[4] = 1
$entry[6] = 32
[BitConverter]::GetBytes([uint32]$png.Length).CopyTo($entry, 8)
[BitConverter]::GetBytes([uint32]22).CopyTo($entry, 12)
[System.IO.File]::WriteAllBytes((Join-Path $Root "favicon.ico"), $header + $entry + $png)
Write-Host "Wrote favicon.ico (48x48 embedded PNG)"

$img.Dispose()
Write-Host "Done. Logo assets generated from central-riverfront-logo.png"
