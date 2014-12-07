<?php
echo 'deploy';
$deployKey = isset($_GET['key']) ? $_GET['key'] : '';
$output = shell_exec('deploy.sh '.$deployKey);
echo "<pre>$output</pre>";