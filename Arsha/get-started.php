<?php
$fileAttached = isset($_FILES['fileInput']) && $_FILES['fileInput']['size'] > 0;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handle file submission logic here
    if ($fileAttached) {
        echo "File submitted!";
        // file handling logic here
    } else {
        echo "Please attach a file before submitting.";
    }
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <title>Job FinDR | Get Started</title>
    <meta content="" name="description">
    <meta content="" name="keywords">
    <link href="assets/img/logo.png" rel="icon">
    <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon">
    <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Jost:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i"
        rel="stylesheet">
    <link href="assets/vendor/aos/aos.css" rel="stylesheet">
    <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
    <link href="assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
    <link href="assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
    <link href="assets/vendor/remixicon/remixicon.css" rel="stylesheet">
    <link href="assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">
    <link href="assets/css/style.css" rel="stylesheet">
    <script src="https://kit.fontawesome.com/894d660221.js" crossorigin="anonymous"></script>
</head>

<body>
    <header id="header" class="fixed-top">
        <div class="container d-flex align-items-center">
            <h1 class="logo me-auto"><a href="index.html">Job FinDR</a></h1>
            <nav id="navbar" class="navbar">
                <ul>
                    <li><a class="nav-link" href="index.html">Home <i
                                class="fa-solid fa-house" style="color: #ffffff;"></i></a></li>
                </ul> <i class="bi bi-list mobile-nav-toggle"></i>
            </nav>
        </div>
    </header>
    <section id="hero" class="flex-column align-items-center" style="height: 92vh;">
        <div class="upload-title" style="margin-top: 30px;">
            <h1>Upload Resume</h1>
        </div>
        <div class="upload-container" style="margin-top: 40px;"> <form method="post" enctype="multipart/form-data">
                <label for="fileInput" class="upload-btn">Choose File</label> <input type="file" name="fileInput"
                    id="fileInput" accept=".doc, .docx, .pdf, image/*" onchange="displayFileName()">
                <p class="file-name" id="fileName">No file chosen</p> <button type="button" class="submit-btn"
                    onclick="submitForm()">Submit</button>
            </form>
        </div>
    </section>
    </main>
    <footer id="footer2">
        <div class="container footer-bottom clearfix">
            <div class="copyright"> &copy;<strong><span> JobFinDR</span></strong>. All Rights Reserved 2023 </div>
        </div>
    </footer>
    <div id="preloader"></div><a href="#"
        class="back-to-top d-flex align-items-center justify-content-center"><i
            class="bi bi-arrow-up-short"></i></a>
    <script src="assets/vendor/aos/aos.js"></script>
    <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="assets/vendor/swiper/swiper-bundle.min.js"></script>
    <script src="assets/js/main.js"></script>
    <script>
        function submitForm() {
            document.forms[0].submit();
        }
        window.addEventListener("beforeunload", function (event) {
            var fileAttached = document.getElementById("fileInput").files.length > 0;

            if (fileAttached) {
                var confirmationMessage = "You have an attached file. Are you sure you want to leave?";
                (event || window.event).returnValue = confirmationMessage; 
                return confirmationMessage; 
            }
        });
    </script>
</body>

</html>
