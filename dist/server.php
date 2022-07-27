<?php

    // echo var_dump($_POST); normal data FormData
    $_POST = json_decode(file_get_contents("php://input", true));
    echo var_dump($_POST);

?>