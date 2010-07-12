xquery version '1.0-ml';
xdmp:set-response-content-type('text/plain; charset=utf-8'),
xdmp:add-response-header('Content-Disposition',
	fn:concat('attachment; filename=', xdmp:get-request-field('filename', ''), '.xqy')
	),
xdmp:get-request-field('contents', '')
