export const createHTML = (html: string, css: string, js: string) => {
    const combinedHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>${css}</style>
        </head>
        <body>
            ${html}
            <script>${js}</script>
        </body>
        </html>
    `;
    return combinedHtml;
}