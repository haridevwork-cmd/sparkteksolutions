$file = "index.html"
$content = Get-Content $file -Raw
$search = "    <!-- Font Awesome -->`r`n    <link rel=`"stylesheet`" href=`"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css`">`r`n    `r`n    <style>"
$replace = "    <!-- Font Awesome -->`r`n    <link rel=`"stylesheet`" href=`"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css`">`r`n    <link rel=`"stylesheet`" href=`"light-theme.css`">`r`n    `r`n    <style>"
$content = $content.Replace($search, $replace)
$content | Set-Content $file -NoNewline
