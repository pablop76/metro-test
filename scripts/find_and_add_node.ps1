$paths = @('C:\Program Files','C:\Program Files (x86)',$env:USERPROFILE)
$node = Get-ChildItem -Path $paths -Filter node.exe -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1 -ExpandProperty FullName
if ($node) {
  $dir = Split-Path $node
  $current = [Environment]::GetEnvironmentVariable('Path','User')
  if ($current -notlike "*${dir}*") {
    [Environment]::SetEnvironmentVariable('Path', $current + ';' + $dir, 'User')
    Write-Output "ADDED:$dir"
  } else {
    Write-Output "ALREADY:$dir"
  }
  $ver = & $node --version 2>$null
  Write-Output "NODEVERSION:$ver"
} else {
  Write-Output 'NOTFOUND'
}
