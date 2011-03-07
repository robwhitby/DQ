xquery version '1.0-ml';
import module namespace v = 'com.marklogic.developer.cq.view' at '../lib-view.xqy';
import module namespace c = 'com.marklogic.developer.cq.controller' at '../lib-controller.xqy';

xdmp:set-response-content-type('text/html; charset=utf-8'),

<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"/>
		<meta http-equiv="X-UA-Compatible" content="IE=8"/>
		<title>DQ</title>
		<link rel="stylesheet" type="text/css" href="css/DQ.css"/>
	</head>
	
	<body>

		<div id="editor-ct">
			<form name="form1" method="POST" action="../eval.xqy" target="resultFrame">
				<textarea id="query" name="query" spellcheck="false"/>
				<div id="controls-ct">
					<select onchange="return DQ.appServerChange(this.value)">
						{ let $sel := v:get-eval-selector() return ($sel/attribute::*, $sel/*) }
					</select>
					<input type="hidden" name="mime-type"/>
					<input type="hidden" name="save-file"/>
					<button onclick="return DQ.process('text/xml');" title="Shortcut: ctrl-enter">XML</button>
					<button onclick="return DQ.process('text/plain');" title="Shortcut: ctrl-shift-enter">TEXT</button>
					<button onclick="return DQ.process('text/html');" title="Shortcut: alt-enter">HTML</button>
					<button onclick="return DQ.process('text/plain', true);" title="Shortcut: ctrl-alt-enter">FILE</button>
					<button onclick="return DQ.process('application/x-com.marklogic.developer.cq.profiling');" title="Shortcut: ctrl-alt-shift-enter">PROFILE</button>
					<button onclick="return DQ.process('explore');" title="Shortcut: ctrl-shift-e">EXPLORE</button>
				</div>
			</form>
		</div>
			
		<form name="download" id="download" method="POST" action="download.xqy">
			<input type="hidden" name="filename" id="filename"/>
			<input type="hidden" name="contents" id="contents"/>
		</form>
			
		<script type="text/javascript" src="edit_area/edit_area_full.js">{' '}</script>
		<script type="text/javascript" src="edit_area/reg_syntax/xquery.js">{' '}</script>

		<script type="text/javascript" src="js/DQ.js">{' '}</script>

	</body>
</html>