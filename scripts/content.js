const OPTIONS = {
  attribute_url: "data-url",
  successColor: "#4CAF50",
  failColor: "#F44336",
  warningColor: "#FFEB3B",
  backgroundColor: "#121212",
  charsToCheckFor: [
    "∕",
  ],
};

window.addEventListener("load", () => {
  const tooltip = document.createElement("div");
  tooltip.style.display = "none";
  tooltip.style.position = "fixed";
  tooltip.style.right = "0px";
  tooltip.style.bottom = "0px";
  tooltip.style.backgroundColor = OPTIONS.backgroundColor;
  tooltip.style.padding = ".5em";
  tooltip.style.width = "25vw";
  tooltip.style.height = "7vh";
  tooltip.style.zIndex = "100000000";

  window.addEventListener("mousemove", (e) => {
    const target = e.target;
    if (target instanceof HTMLAnchorElement) {
      tooltip.style.display = "block";
      if (tooltip.getAttribute(OPTIONS.attribute_url) != target.href) {
        console.log("REBUILDING");
      for (const c of tooltip.children) c.remove();
        tooltip.appendChild(buildTooltipContent(target.href));
        tooltip.setAttribute(OPTIONS.attribute_url, target.href);
      }
    } else {
      tooltip.style.display = "none";
      for (const c of tooltip.children) c.remove();
      tooltip.removeAttribute(OPTIONS.attribute_url);
    }
  });
  document.body.appendChild(tooltip);
});

function buildTooltipContent(href) {
  const url = new URL(href), content = document.createElement("div");

  content.appendChild(makeCheckLine(
    "Hostname",
    true,
    url.hostname,
  ));

  const hrefDecoded = decodeURI(url.href);
  const flaggedChars = OPTIONS.charsToCheckFor.filter((char) => hrefDecoded.includes(char));
  content.appendChild(makeCheckLine(
    "Special Characters",
    flaggedChars.length == 0,
    flaggedChars.length.toString(),
  ));

  content.appendChild(makeCheckLine(
    "Username",
    url.username == "" ? "success" : "warning",
    decodeURI(url.username),
  ));

  return content;
}

function makeCheckLine(label, success, extraInfo) {
  const div = document.createElement("div");
  div.style.display = "flex";
  div.style.width = "100%";
  if (typeof success == "boolean") {
    div.style.color = success ? OPTIONS.successColor : OPTIONS.failColor;
  } else if (typeof success == "string") {
    if (success == "success") div.style.color = OPTIONS.successColor;
    else if (success == "warning") div.style.color = OPTIONS.warningColor;
    else if (success == "fail") div.style.color = OPTIONS.failColor;
  }

  const labelEl = document.createElement("span");
  labelEl.innerHTML = label;
  labelEl.style.width = "100%";
  div.appendChild(labelEl);

  const result = document.createElement("span");
  result.innerHTML = extraInfo;
  result.style.width = "20%x";
  div.appendChild(result);

  return div;
}