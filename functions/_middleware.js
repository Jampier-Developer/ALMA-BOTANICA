export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.hostname === 'alma-botanica.pages.dev') {
    url.hostname = 'alma-botanica.store';
    return Response.redirect(url.toString(), 301);
  }
  return context.next();
}
