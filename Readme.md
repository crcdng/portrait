

todo: server upload


<form id="uploadbanner" enctype="multipart/form-data" method="post" action="#">
   <input id="fileupload" name="myfile" type="file" />
   <input type="submit" value="submit" id="submit" />
</form>


<?php
$file = $_FILES['file'];
move_uploaded_file($file['tmp_name'], 'uploads/' . $file['name']);?># portrait
