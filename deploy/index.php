<?php
$deployKey = isset($_GET['key']) ? $_GET['key'] : '';
echo 'deploy '.$deployKey;
$output = shell_exec('deploy.sh '.$deployKey);
echo "<pre>$output</pre>";