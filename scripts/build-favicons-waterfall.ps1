$Root = "c:\Users\dtsio\Desktop\cursor"
$Src = Join-Path $Root "assets\waterfall-logo.png"

Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile((Resolve-Path $Src))

function Save-PngSize($size, $outPath) {
  $bmp = New-Object System.Drawing.Bitmap $size, $size
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $g.Clear([System.Drawing.Color]::White)
  $ratio = [Math]::Min($size / $img.Width, $size / $img.Height)
  $w = [int]($img.Width * $ratio)
  $h = [int]($img.Height * $ratio)
  $x = ($size - $w) / 2
  $y = ($size - $h) / 2
  $g.DrawImage($img, $x, $y, $w, $h)
  $g.Dispose()
  $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
}

Save-PngSize 48  (Join-Path $Root "favicon.png")
Save-PngSize 32  (Join-Path $Root "favicon-32x32.png")
Save-PngSize 16  (Join-Path $Root "favicon-16x16.png")
Save-PngSize 180 (Join-Path $Root "apple-touch-icon.png")
Save-PngSize 192 (Join-Path $Root "assets\android-chrome-192x192.png")
Save-PngSize 512 (Join-Path $Root "assets\android-chrome-512x512.png")

$png = [System.IO.File]::ReadAllBytes((Join-Path $Root "favicon.png"))
$header = [byte[]](0,0,1,0,1,0)
$entry = New-Object byte[] 16
$entry[0]=48; $entry[1]=48; $entry[4]=1; $entry[6]=32
[BitConverter]::GetBytes([uint32]$png.Length).CopyTo($entry, 8)
[BitConverter]::GetBytes([uint32]22).CopyTo($entry, 12)
[System.IO.File]::WriteAllBytes((Join-Path $Root "favicon.ico"), $header + $entry + $png)

$img.Dispose()
Write-Host "Favicons generated from waterfall-logo.png"
