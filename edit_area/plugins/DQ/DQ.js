var EditArea_DQ = {
	DQ: null,
	
	init: function(){}
	
	,get_control_html: function(ctrl_name){
		return false;
	}
 	
	,onload: function(){
		this.DQ = top.frames[0].DQ;
	}
	
	,onkeydown: function(e){
		//only interested in enter(13) and e(69)
		if (e.keyCode === 13 || e.keyCode === 69) {
			var mods = {ctrl: CtrlPressed(e), alt: AltPressed(e), shift: ShiftPressed(e)};
			if (!mods.ctrl && !mods.alt && !mods.shift) {
				return true;
			}
			var enterKey = (e.keyCode === 13);
			var eKey = (e.keyCode === 69);
			
			if (enterKey && mods.ctrl && mods.alt && mods.shift) { return this.DQ.process('application/x-com.marklogic.developer.cq.profiling'); }
			else if (enterKey && mods.ctrl && mods.shift) { return this.DQ.process('text/plain'); }
			else if (enterKey && mods.ctrl && mods.alt) { return this.DQ.process('text/plain', true); }
			else if (enterKey && mods.ctrl) { return this.DQ.process('text/xml'); }
			else if (enterKey && mods.alt) { return this.DQ.process('text/html'); }
			else if (eKey && mods.ctrl && mods.shift) { return this.DQ.process('explore'); }
			else { return true; }
		}
		else {
			return true;
		}
	}
};

editArea.add_plugin("DQ", EditArea_DQ);
