// Security Basics: XSS & CSRF
// Web application security requires protecting user sessions and data payloads from unauthorized malicious scripts or unintended executions.

//  XSS (Cross-Site Scripting)
// XSS occurs when an attacker injects malicious client-side script code (usually JavaScript) into a trusted website, which then executes automatically in an unsuspecting user's browser.

// The Risk
// The injected script runs with full access to the user's session cookies, local storage tokens, and private data, allowing attackers to hijack active accounts.


// Mitigation / Prevention
// Context-Aware Escaping/Sanitization: Never trust raw user inputs. Convert special characters into safe HTML entities (e.g., transforming < into &lt;) before rendering text to the page.
// HTTPOnly Cookies: Store sensitive session tokens inside cookies marked with the HttpOnly flag. This completely blocks JavaScript code from reading the cookie data via document.cookie.
// CSP (Content Security Policy): Implement strict HTTP response headers defining exactly which external domains are permitted to load or execute scripts on your webpage.



// CSRF (Cross-Site Request Forgery)
// CSRF is an attack that forces an authenticated user's browser to send a malicious, unauthorized HTTP request to a vulnerable web application where the user is currently logged in.

// The Risk
// Because browsers automatically append active cookies to outgoing HTTP requests matching the target domain, the vulnerable server mistakes the forced, malicious request for a legitimate command initiated intentionally by the user (e.g., executing an unauthorized money transfer or email change).

// Mitigation / Prevention
// Anti-CSRF Tokens: Inject a unique, unpredictable, and hidden cryptographic token into forms and headers. The server validates this token with every incoming request; since an external attacker cannot read this token, forged requests fail validation.
// SameSite Cookie Attribute: Configure cookie parameters with SameSite=Strict or SameSite=Lax. This instructs the browser never to send the session cookie during cross-site requests, neutralizing CSRF avenues.