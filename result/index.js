const url = new URL(window.location.toString()).searchParams.get("url"), parsedURL = new URL(url);

document.getElementById("url").innerHTML = url;

if (parsedURL.protocol != "") {
  document.getElementById("protocol").style.display = "flex";
  document.getElementById("protocol_value").innerHTML = parsedURL.protocol;
}
if (parsedURL.username) {
  document.getElementById("username").style.display = "flex";
  document.getElementById("username_value").innerHTML = decodeURI(parsedURL.username);
}
if (parsedURL.password) {
  document.getElementById("password").style.display = "flex";
  document.getElementById("password_value").innerHTML = decodeURI(parsedURL.username);
}
if (parsedURL.hostname) {
  document.getElementById("hostname").style.display = "flex";
  document.getElementById("hostname_value").innerHTML = parsedURL.hostname;
}
if (parsedURL.port) {
  document.getElementById("port").style.display = "flex";
  document.getElementById("port_value").innerHTML = parsedURL.port;
}
if (parsedURL.pathname) {
  document.getElementById("path").style.display = "flex";
  document.getElementById("path_value").innerHTML = parsedURL.pathname;
}

if (url.includes("\u2215")) {
  document.body.style.backgroundColor = "var(--var-color-fail)";
} else {
  document.body.style.backgroundColor = "var(--var-color-success)";
}