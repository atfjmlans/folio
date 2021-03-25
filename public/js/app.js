var appUrl = location.hostname;
if (appUrl == 'localhost') {
    appUrl = 'http://' + location.hostname + '/portfolio/public/index.php/';
} else {
    appUrl = 'https://' + location.hostname; + 'index.php/'
}