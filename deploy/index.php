<?php
$deployKey = isset($_GET['key']) ? $_GET['key'] : '';
echo 'deploy '.$deployKey;
$output1 =  shell_exec('whoami');
echo "<pre>".$output1."</pre>";

$output = shell_exec('/bin/bash deploy.sh '.$deployKey);
echo "<pre>$output</pre>";