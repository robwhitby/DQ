var DQ = {
	editorId: 'query',
	tabCounter: 0,
	data: null,
	selectApp: null,
	editorFrame: null,
	isIE: /msie/.test(navigator.userAgent.toLowerCase()),
	newTemplate: 'xquery version "1.0-ml";\n\n'
};

DQ.log = function(){} 
//DQ.log = console.log;
//DQ.log = alert;

DQ.eaLoadCb = function() {
	DQ.editorFrame = document.getElementById('frame_' + DQ.editorId);
	if (DQ.data && DQ.data.length > 0) {
		for (var i=0; i<DQ.data.length; i++) {
			DQ.openFile(DQ.data[i]);		
		}
	}
	else {
		DQ.openFile();
	}
	area.new_document = DQ.openFile;
	
	DQ.editorFrame.style.height = '100%';
	DQ.editorFrame.style.width = '100%';
	
	/* ie requires explicit resizing onload and onresize */
	if (DQ.isIE) { 
		DQ.resizeEditor();
		window.onresize = DQ.resizeEditor;
	} 
	
	DQ.editorFrame.contentWindow.document.getElementById('toolbar_1').style.textAlign = 'left';
};

DQ.eaFileSwitchCb = function() {
	var appServer = editAreaLoader.getCurrentFile(DQ.editorId).appServer;
	if (appServer) { DQ.selectApp.value = appServer; }
};
		
DQ.openFile = function(data) {
	var fileId = 'tab' + ++DQ.tabCounter;
	editAreaLoader.openFile(DQ.editorId, {
			id: fileId, 
			text: (data)? data.text : DQ.newTemplate, 
			title: (data)? data.title : 'New ' + DQ.tabCounter
		}
	);
	DQ.log('openFile', data);
	editAreaLoader.getFile(DQ.editorId, fileId).appServer = (data)? data.appServer : DQ.selectApp.value;
	if (data) { DQ.selectApp.value = data.appServer; }
}

DQ.resizeEditor = function(w, h) {
	if (DQ.editorFrame) { 
		DQ.editorFrame.style.width = document.documentElement.clientWidth;
		DQ.editorFrame.style.height = document.documentElement.clientHeight;
	}
}

DQ.appServerChange = function() {
	editAreaLoader.getCurrentFile(DQ.editorId).appServer = DQ.selectApp.value;
};


DQ.process = function(format, saveFile) {
	var sel = editAreaLoader.getSelectedText(DQ.editorId);
	var q = editAreaLoader.getValue(DQ.editorId);
	document.forms.form1.query.value = (sel.length > 1)? sel : q;
	document.forms.form1['mime-type'].value = format;
	document.forms.form1['save-file'].value = (arguments.length === 2)? saveFile : false;
	
	//thanks to http://github.com/malteseduck 
	document.forms.form1.action = (format === 'explore')? '../explore.xqy' : '../eval.xqy';
	document.forms.form1.submit();
	DQ.save();
	return false;
}

DQ.load = function() {	
	if (window.localStorage) {
		DQ.data = JSON.parse(localStorage.DQ? localStorage.DQ : '[]');
		DQ.log('load data', DQ.data);
		DQ.newTemplate = localStorage.DQ_template? localStorage.DQ_template : DQ.newTemplate;
	}
	DQ.selectApp = document.getElementById('eval');
	
	editAreaLoader.init({
		id: DQ.editorId,
		start_highlight: true,
		allow_resize: 'no',
		allow_toggle: false,
		syntax: 'xquery',
		is_multi_files: true,
		toolbar: 'new_document, save, |, undo, redo, |, select_font,|, search, go_to_line, |, highlight, reset_highlight, word_wrap, |, help',
		EA_load_callback: 'DQ.eaLoadCb',
		save_callback: 'DQ.download',
		EA_file_switch_on_callback: 'DQ.eaFileSwitchCb',
		plugins: 'DQ',
		replace_tab_by_spaces: 2
	});
};	

DQ.save = function() {
	if (window.localStorage) {
		var files = editAreaLoader.getAllFiles(DQ.editorId);
		var data = [];
		for (var f in files) {
			data.push({
				title: files[f].title, 
				text: files[f].text,
				appServer: files[f].appServer
			});
		}
		localStorage.DQ = JSON.stringify(data);
	}
};

DQ.saveTemplate = function() {
	if (window.localStorage && window.confirm("Replace new tab template with current text?")) {
		var q = editAreaLoader.getValue(DQ.editorId);
		DQ.newTemplate = q;
		localStorage.DQ_template = q;
		DQ.log('saveTemplate', q);
	}
	return false;
};

DQ.download = function(id, text) {
	document.getElementById('filename').value = id;
	document.getElementById('contents').value = text;
	document.forms.download.submit();
};

window.onload = DQ.load;
window.onunload = DQ.save;