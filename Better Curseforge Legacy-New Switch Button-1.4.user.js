// ==UserScript==
// @name         Better Curseforge Legacy/New Switch Button
// @version      1.4
// @description  Instead of the useless home pages, "change to legacy/new site" button now redirects to the current page of the legacy or new site.
// @author       Aichi Chikuwa
// @match        https://www.curseforge.com/*
// @match        https://legacy.curseforge.com/*
// ==/UserScript==

(function() {
    'use strict';
    var currentUrl = window.location.href;
    var newUrl;
    var linkElement;
    if (currentUrl.includes("www.curseforge.com")) {
        newUrl = currentUrl.replace('www', 'legacy');
        if (newUrl.includes("search")) {
            var url = new URL(currentUrl);
            var classParam = url.searchParams.get("class");
            var categoriesParam = url.searchParams.get("categories");
            newUrl = `https://legacy.curseforge.com/minecraft/${classParam}/${categoriesParam}`;
        }

        setTimeout(function() {
            linkElement = document.querySelector('a.link-btn.btn-lined.link-btn-icon[href="https://legacy.curseforge.com"]');
            if (linkElement) {
                linkElement.href = newUrl;
                var imgElement = linkElement.querySelector('img');
                linkElement.textContent = "Go to the Legacy version of this page";
                // Preserve the image element within the link
                if (imgElement) {
                    // Re-add the image element to the link element
                    linkElement.insertBefore(imgElement, linkElement.firstChild);
                }
            }


            // Find the <ul> element with class name "top-actions"
            var topActionsElement = document.querySelector('ul.top-actions');

            // Check if the element is found
            if (topActionsElement) {
                // Get all <li> elements within the <ul> element
                var listItems = topActionsElement.querySelectorAll('li');

                // Check if there are at least two <li> elements
                if (listItems.length >= 2) {
                    // Remove the first and second <li> elements
                    listItems[0].remove();
                    listItems[2].remove();
                }
            }
        }, 500);
    } else {
        newUrl = currentUrl.replace('legacy', 'www');

        setTimeout(function() {
            linkElement = document.querySelector('a.top-nav__nav-link[href="https://www.curseforge.com"]');
            if (linkElement) {
                linkElement.href = newUrl;
                var figureElement = linkElement.querySelector('figure.relative');
                // Check if the figure element is found
                if (figureElement) {
                    linkElement.innerHTML = "";
                    linkElement.appendChild(figureElement);
                    linkElement.appendChild(document.createTextNode("Go to the Modern version of this page"));
                }
            }
        }, 500);
    }

    // Function to execute when the URL changes
    function onUrlChange() {
        //console.log("URL has changed to: " + window.location.href);
        if (currentUrl.includes("www.curseforge.com")) {
            newUrl = currentUrl.replace('www', 'legacy');
            if (newUrl.includes("search")) {
                var url = new URL(currentUrl);
                var classParam = url.searchParams.get("class");
                var categoriesParam = url.searchParams.get("categories");
                if (!categoriesParam) {
                    newUrl = `https://legacy.curseforge.com/minecraft/${classParam}`;
                }
                else {
                    newUrl = `https://legacy.curseforge.com/minecraft/${classParam}/${categoriesParam}`;
                }
            }

            setTimeout(function() {
                //linkElement = document.querySelector('a.link-btn.btn-lined.link-btn-icon[href="https://legacy.curseforge.com"]');
                if (linkElement) {
                    linkElement.href = newUrl;
                }
            }, 500);
        } else {
            newUrl = currentUrl.replace('legacy', 'www');

            setTimeout(function() {
                //linkElement = document.querySelector('a.top-nav__nav-link[href="https://www.curseforge.com"]');
                if (linkElement) {
                    linkElement.href = newUrl;
                }
            }, 500);
        }
    }

    // Initial trigger on page load
    onUrlChange();

    // Listen for changes to the URL
    window.addEventListener('popstate', onUrlChange);

    // For single-page applications, observe changes to the document body
    const observer = new MutationObserver(() => {
        if (window.location.href !== currentUrl) {
            currentUrl = window.location.href;
            onUrlChange();
        }
    });

    currentUrl = window.location.href;
    observer.observe(document.body, { childList: true, subtree: true });



})();
