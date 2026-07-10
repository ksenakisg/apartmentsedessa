$ErrorActionPreference = "Stop"
$Root = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
if (-not (Test-Path "$Root\index.html")) { $Root = "c:\Users\dtsio\Desktop\cursor" }

$Src = "C:\Users\dtsio\.cursor\projects\c-Users-dtsio-Desktop-cursor\assets\c__Users_dtsio_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-3fa922cf-d0bc-4737-a55e-bb34932771e9.png"
if (-not (Test-Path $Src)) {
  $Src = Join-Path $Root "assets\central-riverfront-logo.png"
}

Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile((Resolve-Path $Src))

function Save-PngSize($size, $outPath) {
  $bmp = New-Object System.Drawing.Bitmap $size, $size
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $g.Clear([System.Drawing.Color]::FromArgb(255, 250, 247, 250))
  $g.DrawImage($img, 0, 0, $size, $size)
  $g.Dispose()
  $dir = Split-Path $outPath -Parent
  if ($dir -and -not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
  $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  Write-Host "Wrote $outPath ($size px)"
}

# Header + master copy in assets
Save-PngSize 960 (Join-Path $Root "assets\central-riverfront-logo.png")
Save-PngSize 96  (Join-Path $Root "assets\logo-96.png")
Save-PngSize 48  (Join-Path $Root "assets\logo-48.png")

# Favicons at site root (same folder as index.html)
Save-PngSize 48  (Join-Path $Root "favicon.png")
Save-PngSize 32  (Join-Path $Root "favicon-32x32.png")
Save-PngSize 16  (Join-Path $Root "favicon-16x16.png")
Save-PngSize 48  (Join-Path $Root "favicon-48x48.png")
Save-PngSize 180 (Join-Path $Root "apple-touch-icon.png")
Save-PngSize 192 (Join-Path $Root "assets\android-chrome-192x192.png")
Save-PngSize 512 (Join-Path $Root "assets\android-chrome-512x512.png")

$img.Dispose()
Write-Host "Done. Root: $Root"
