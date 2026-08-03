import os

with open(r"c:\Users\Kavyasri\OneDrive\Desktop\portfolio\app.jsx", "r", encoding="utf-8") as f:
    app_code = f.read()

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Potluri Divya Sri | React & Vite Portfolio</title>
  <meta name="description" content="React Portfolio of Potluri Divya Sri - M.Tech CSE, React Developer, AI Engineer, and NxtWave Intern.">
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">

  <!-- Remix Icons -->
  <link href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" rel="stylesheet"/>

  <!-- React 18 & Babel Standalone CDNs -->
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

  <!-- Main Stylesheet -->
  <link rel="stylesheet" href="styles.css">
</head>
<body class="dark-theme accent-cyan">

  <!-- React Root Container -->
  <div id="root"></div>

  <!-- Inline Babel React Application Script (Bypasses local CORS file protocol restrictions) -->
  <script type="text/babel">
{app_code}
  </script>
</body>
</html>
"""

with open(r"c:\Users\Kavyasri\OneDrive\Desktop\portfolio\index.html", "w", encoding="utf-8") as f:
    f.write(html_content)

print("Combined index.html created successfully!")
