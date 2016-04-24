
//<![CDATA[ 
    //check for the .asp version of the details page URL as well as the two variations of SEO-friendly URLs for product details, then include scripts
    document.addEventListener('DOMContentLoaded', function(){
        if (location.pathname == "/ProductDetails.asp" || 
            location.pathname.indexOf("-p/") != -1 || 
            location.pathname.indexOf("_p/") != -1) {

                //get location for placement of scripts, including full.js include, global variables, and snippet function call
                var prSnippetLocation = document.getElementById("{element_id}"); //element used to append snippet
                //get location for placement of engine function call
                var prEngineLocation = document.getElementById("{element_id}"); //element used to append review display

                // build script to include PowerReviews full.js file 
                var prIncludeScript = document.createElement("script");
                prIncludeScript.setAttribute("id", "prIncludeScript");
                prIncludeScript.defer=true;
                prIncludeScript.type = "text/javascript";
                prIncludeScript.src = "//cdn.powerreviews.com/repos/{MGID}/pr/pwr/engine/js/full.js";
                // append script
                prSnippetLocation.appendChild(prIncludeScript);
                
                

                // build script to include PowerReviews variable block
                var prVarBlockScript = document.createElement("script");
                prVarBlockScript.setAttribute("id", "prVarBlockScript");
                prVarBlockScript.defer=true;
                prVarBlockScript.type = "text/javascript";
                prVarBlockScript.text = "var productCodeClass = document.getElementsByClassName('product_code'); var pageId = productCodeClass[0].innerText; function powerreview(element){var prDiv = document.getElementById(element),pwr;if (prDiv){pwr = {write : function(content){var prDiv = document.getElementById(element);prDiv.innerHTML =  prDiv.innerHTML + content;}};} else {pwr = null;}return pwr;} var pr_page_id=pageId; var pr_locale='en_US'; var pr_site_id='1'; var pr_merchant_id={MID}; var pr_zip_location='//cdn.powerreviews.com/repos/{MGID}/pr';  var pr_write_review='{www.dommain.com/writeareviewurl.html?pageId=' + pr_page_id};"
                // append script
                prSnippetLocation.appendChild(prVarBlockScript);

                // create snippet div, update styling as needed
                var prSnippetDiv = document.createElement("div");
                prSnippetDiv.className = "pr_review_snippet";
                prSnippetDiv.style.width = "500px";
                prSnippetDiv.style.paddingTop = "15px";
                prSnippetDiv.style.left = "20px";
                prSnippetDiv.style.float = "right";
                prSnippetDiv.style.position = "relative";
                prSnippetDiv.setAttribute("id", "reviewssnippet");
               
                // append snippet div to dom
                prSnippetLocation.appendChild(prSnippetDiv);

                // create display div, update styling as needed
                var prEngineDiv = document.createElement("div");
                prEngineDiv.className = "pr_review_display";
                prEngineDiv.setAttribute("id", "reviewsdisplay");
                prEngineDiv.style.width = "765px";

                // append display div to dom
                prEngineLocation.appendChild(prEngineDiv);


                // build script to include PowerReviews snippet() function
                var prExecuteScripts = document.createElement("script");
                prExecuteScripts.defer = true;
                prExecuteScripts.type = "text/javascript";
                prExecuteScripts.text = "window.onload = function(){var reviewsnippet = powerreview('reviewssnippet'); if(reviewsnippet){POWERREVIEWS.display.snippet(reviewsnippet);} engineFunction();}; function engineFunction(){var reviews = powerreview('reviewsdisplay'); if(reviews){POWERREVIEWS.display.engine(reviews);};}";

                // append script to snippet div
                document.body.appendChild(prExecuteScripts);


                
            };
       });
//]]> 

/* Copyright (c) 2016 William Hayslett@ PowerReviews, Inc. */

