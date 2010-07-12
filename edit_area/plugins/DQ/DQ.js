var EditArea_DQ = {
	DQ: null,
	
	init: function(){}
	
	,get_control_html: function(ctrl_name){
		return false;
	}
 	
	,onload: function(){
		this.DQ = top.frames['editorFrame'].DQ;
	}
	
	,onkeydown: function(e){
		if (e.keyCode === 13) {
			var mods = {ctrl: CtrlPressed(e), alt: AltPressed(e), shift: ShiftPressed(e)};
			if (!mods.ctrl && !mods.alt && !mods.shift) {
				return true;
			}
			if (mods.ctrl && mods.alt && mods.shift) { return this.DQ.process('application/x-com.marklogic.developer.cq.profiling'); }
			else if (mods.ctrl && mods.shift) { return this.DQ.process('text/plain'); }
			else if (mods.ctrl && mods.alt) { return this.DQ.process('text/plain', true); }
			else if (mods.ctrl) { return this.DQ.process('text/xml'); }
			else if (mods.alt) { return this.DQ.process('text/html'); }
			else return true;
		}
		else {
			return true;
		}
	}
};

editArea.add_plugin("DQ", EditArea_DQ);
