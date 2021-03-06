var cluster_view_tooltip_base = "";
var cluster_view_tooltip_base = '<div class="legendrow"><img src="/cloud/static/images/bluebox.png">Pending</div><div class="legendrow"><img src="/cloud/static/images/yellowbox.png">Starting</div><div class="legendrow"><img src="/cloud/static/images/greenbox.png">Ready</div><div class="legendrow"><img src="/cloud/static/images/redbox.png">Error</div>';
var TESTING = false;
var instances = Array();

// Are there "expected" pending instances to be drawn
var pending_instance = false;

// The number of "expected" pending instances to be drawn
var num_pending_instances = 0;

// The lifecycle of an instance being requested (eg, on-demand, spot)
var inst_lifecycle = "on-demand";

// The length of instances[] at the time of the user adding new instances
var old_instance_length = 1;

if (TESTING == true){
    instances = [
                {'id' : 'i-23456789',
                'ld' : '0 0 0',
                'time_in_state' : 2,
                'nfs_data' : 0,
                'nfs_tools' : 0,
                'nfs_indices' : 0,
                'nfs_sge' : 0,
                'get_cert' : 0,
                'slurmd_running' : 0,
                'worker_status' : 'Starting',
                'instance_state' : 'running'},
                {'id' : 'i-12345678901234567',
                'ld' : '0.38 0.20 0.50',
                'time_in_state' : 2,
                'nfs_data' : 0,
                'nfs_tools' : 0,
                'nfs_indices' : 0,
                'nfs_sge' : 0,
                'get_cert' : 0,
                'slurmd_running' : 0,
                'worker_status' : 'Starting',
                'instance_state' : 'running'},
                {'id' : 'instance-3',
                'ld' : '0',
                'time_in_state' : '2123s',
                'nfs_data' : 1,
                'nfs_tools' : 1,
                'nfs_indices' : 1,
                'nfs_sge' : 1,
                'get_cert' : -1,
                'slurmd_running' : 1,
                'worker_status' : 'Error',
                'instance_state' : 'running'},
                {'id' : 'instance-4',
                'ld' : 0,
                'time_in_state' : 0,
                'nfs_data' : 0,
                'nfs_tools' : 0,
                'nfs_indices' : 0,
                'nfs_sge' : 0,
                'get_cert' : 0,
                'slurmd_running' : 0,
                'worker_status' : 'Pending',
                'instance_state' : 'pending'},
                {'id' : 'instance-5',
                 'ld' : '0.38 0.20 0.50',
                 'time_in_state' : 2,
                 'nfs_data' : 0,
                 'nfs_tools' : 0,
                 'nfs_indices' : 0,
                 'nfs_sge' : 0,
                 'get_cert' : 0,
                 'slurmd_running' : 0,
                 'worker_status' : 'Starting',
                 'instance_state' : 'running'},
                 {'id': 'instance-5',
                  'ld': '0.88 1.20 0.50',
                  'time_in_state': 2,
                  'nfs_data': 1,
                  'nfs_tools': 1,
                  'nfs_indices': 1,
                  'nfs_sge': 1,
                  'get_cert': 1,
                  'slurmd_running': 1,
                  'worker_status': 'Running',
                  'instance_state': 'running'},
                  {'id' : 'instance-1',
                  'ld' : '0.38 0.20 0.50',
                  'time_in_state' : 2,
                  'nfs_data' : 0,
                  'nfs_tools' : 0,
                  'nfs_indices' : 0,
                  'nfs_sge' : 0,
                  'get_cert' : 0,
                  'slurmd_running' : 0,
                  'worker_status' : 'Starting',
                  'instance_state' : 'running'},
                  {'id' : 'instance-2',
                  'ld' : '0.38 0.20 0.50',
                  'time_in_state' : 2,
                  'nfs_data' : 0,
                  'nfs_tools' : 0,
                  'nfs_indices' : 0,
                  'nfs_sge' : 0,
                  'get_cert' : 0,
                  'slurmd_running' : 0,
                  'worker_status' : 'Starting',
                  'instance_state' : 'running'},
                  {'id' : 'i-d2a984b5',
                  'ld' : '0',
                  'time_in_state' : '7m 36s',
                  'nfs_data' : 0,
                  'nfs_tools' : 0,
                  'nfs_indices' : 0,
                  'nfs_sge' : 0,
                  'get_cert' : 0,
                  'slurmd_running' : 0,
                  'worker_status' : 'active',
                  'instance_state' : 'running'},
                  {'id' : null,
                  'ld' : 0,
                  'time_in_state' : 0,
                  'nfs_data' : 0,
                  'nfs_tools' : 0,
                  'nfs_indices' : 0,
                  'nfs_sge' : 0,
                  'get_cert' : 0,
                  'slurmd_running' : 0,
                  'worker_status' : 'open',
                  'instance_state' : null},

                   {'id' : 'instance-6',
                     'ld' : '0.38 0.20 0.50',
                     'time_in_state' : 2,
                     'nfs_data' : 0,
                     'nfs_tools' : 0,
                     'nfs_indices' : 0,
                     'nfs_sge' : 0,
                     'get_cert' : 0,
                     'slurmd_running' : -1,
                     'worker_status' : 'Error',
                     'instance_state' : 'running'},
                  {'id' : 'instance-7',
                    'ld' : '0.38 0.20 0.50',
                    'time_in_state' : 2,
                    'nfs_data' : 0,
                    'nfs_tools' : 0,
                    'nfs_indices' : 0,
                    'nfs_sge' : 0,
                    'get_cert' : -1,
                    'slurmd_running' : 0,
                    'worker_status' : 'Error',
                    'instance_state' : 'running'}
                ];
}

var selected_instance = -1;

var b_width = 25,
	b_height = 25,
	bar_height = 23,
	bar_top_padding = 1,  // portion of b_height - bar_height (in pixels) to take for the top.
	b_spacing = 5,
	n_width = 5,
	n_height = 4,
	c_width = 200,
	c_height = 200;
	b_corner_rad = 5;
	ld_1 = 3;
	ld_5 = 6;
	ld_15 = 10;
	x_offset = 2;
	y_offset = 2;
	b_stroke = 1.5;

var c_elem, ctx;

function roundedBox(x, y, w, h, rad, ctx, stroke){
    ctx.beginPath();
    ctx.moveTo(x, y+rad);
    ctx.quadraticCurveTo(x, y, x + rad, y);
    ctx.lineTo(x + w - rad, y);
    ctx.quadraticCurveTo(x + w, y, x+w, y+rad);
    ctx.lineTo(x+w, y+h - rad);
    ctx.quadraticCurveTo(x+w, y+h, x+w - rad, y+h);
    ctx.lineTo(x+rad, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-rad);
    ctx.lineTo(x, y+rad);
    ctx.closePath();
    if (stroke == undefined){
        ctx.fill();
    }
    else{
        lw_save = ctx.lineWidth;
        ctx.lineWidth = stroke;
        ctx.stroke();
        ctx.lineWidth = lw_save;
    }
}

function initCanvas(){
	c_elem = $('#cluster_canvas').get(0);
	if (!c_elem){
		return;
	}
	ctx = c_elem.getContext('2d');
	if (!ctx){
		return;
	}
}

function renderGraph(){
    if (!ctx){
        return;
    }
	ctx.clearRect(0, 0, c_width, c_height);
	if (instances.length <= 20){
		var q = 0;
		for ( i = 0 ; i < n_height; i++){
			for ( j = 0; j < n_width; j++){
				ctx.save();
				b_x = j*b_width + j*b_spacing;
				b_y = i*b_height + i*b_spacing;
				b_xdx = b_x + b_width;
				b_ydy = b_y + b_height;
				if (q == instances.length){
					// Drop shadow for boxes
					ctx.fillStyle = "rgb(230, 230, 230)";
					roundedBox(x_offset + b_x+2, y_offset + b_y+2, b_width, b_height, b_corner_rad, ctx);
					ctx.fillStyle = "rgb(220, 220, 220)"
					roundedBox(x_offset + b_x, y_offset + b_y, b_width, b_height, b_corner_rad, ctx);
					ctx.restore();
					continue;
				}
				// $('#status').append("Varcheck " + q);
				instances[q].b_x = b_x;
				instances[q].b_y = b_y;
				instances[q].b_xdx = b_xdx;
				instances[q].b_ydy = b_ydy;
				// Drop shadow for boxes
				ctx.fillStyle = "rgb(230, 230, 230)";
				roundedBox(x_offset + b_x+2, y_offset + b_y+2, b_width, b_height, b_corner_rad, ctx);
                if (instances[q].ld != 0){
    				ld_arr = instances[q].ld.split(" ");
                }else{
                    ld_arr = []
                }
                if (instances[q].instance_state == 'shutting_down' || instances[q].instance_state == 'starting'){
					ctx.fillStyle = "#FFDC40"; // yellow
                    roundedBox(x_offset + b_x, y_offset + b_y, b_width, b_height, b_corner_rad, ctx);
                }
                else if (instances[q].worker_status == 'Error'){
			        ctx.fillStyle = "#DF594B"; // red
    				roundedBox(x_offset + b_x, y_offset +  b_y, b_width, b_height, b_corner_rad, ctx);
                }
                else if (instances[q].worker_status == "Ready" || instances[q].worker_status == "Running" || instances[q].worker_status == "running" || (q == 0)){
                        ctx.fillStyle = "#66BB67"; // green
                        roundedBox(x_offset + b_x, y_offset +  b_y, b_width, b_height, b_corner_rad, ctx);
                }
                else if (instances[q].worker_status == "Creating" || instances[q].worker_status == "creating"){
                        ctx.fillStyle = "#5CBBFF"; // blue
                        roundedBox(x_offset + b_x, y_offset + b_y, b_width, b_height, b_corner_rad, ctx);
                }
                else if (instances[q].worker_status == "Pending" || instances[q].worker_status == "pending"){
                        ctx.fillStyle = "#5CBBFF"; // blue
                        roundedBox(x_offset + b_x, y_offset + b_y, b_width, b_height, b_corner_rad, ctx);
                }
				else if(instances[q].worker_status == "Shutdown" || instances[q].worker_status=="shutting down"){
					ctx.fillStyle = "#575757"; // grey
    				roundedBox(x_offset + b_x, y_offset + b_y, b_width, b_height, b_corner_rad, ctx);
				}
				else if(instances[q].worker_status == "active" || instances[q].worker_status=="open"){
                    ctx.fillStyle = "#CDEAFF"; // light blue
                    roundedBox(x_offset + b_x, y_offset + b_y, b_width, b_height, b_corner_rad, ctx);
				}
				else{
                    // Yellow unknown state.
					ctx.fillStyle = "#FFDC40";
                    roundedBox(x_offset + b_x, y_offset + b_y, b_width, b_height, b_corner_rad, ctx);
				}
				if (ld_arr.length == 3){
    				    scale_height = 1; //Scales the boxes.
    				    // Hard cap load at 1.
                        // ld_arr[0] = Math.min(Math.max(0, ld_arr[0]-1), 1);
                        // ld_arr[1] = Math.min(Math.max(0, ld_arr[1]-1), 1);
                        // ld_arr[2] = Math.min(Math.max(0, ld_arr[2]-1), 1);
    					ld_arr[0] = Math.min(ld_arr[0], 1);
    					ld_arr[1] = Math.min(ld_arr[1], 1);
    					ld_arr[2] = Math.min(ld_arr[2], 1);
    			        ctx.fillStyle = "#575757";
                        ctx.fillRect(x_offset + b_x + 3,
                                            y_offset + b_y + (bar_height - bar_height * ld_arr[2]) + bar_top_padding,
                                            ld_15,
                                            bar_height * ld_arr[2]);
                        ctx.fillRect(x_offset + b_x + ld_15 + 3,
                                            y_offset + b_y + (bar_height - bar_height * ld_arr[1]) + bar_top_padding,
                                            ld_5,
                                            bar_height * ld_arr[1]);
                        ctx.fillRect(x_offset + b_x + ld_15 + ld_5 + 3,
                                            y_offset + b_y + (bar_height - bar_height * ld_arr[0]) + bar_top_padding,
                                            ld_1,
                                            bar_height * ld_arr[0]);
                }
                if (q == selected_instance){
    				roundedBox(x_offset + instances[q].b_x, y_offset + instances[q].b_y, b_width, b_height, b_corner_rad, ctx, b_stroke);
                }
				ctx.restore();
				q = q + 1;
			}//cols
		}//rows
	}//if
	else{
        // Implement some other view for supporting many instances eventually.
		for ( i = 0 ; i < n_height; i++){
			for ( j = 0; j < n_width; j++){
				ctx.save();
				// ctx.font = "10px 'arial'";
				b_x = j*b_width + j*b_spacing;
				b_y = i*b_height + i*b_spacing;

				ctx.fillStyle = "rgb(200, 200, 200)";
				ctx.fillRect( b_x+2, b_y+2, b_width , b_height);

				ctx.fillStyle = "rgb(" + i * 40 + ", " + j * 40   + ", 0)";
				ctx.fillRect( b_x, b_y, b_width , b_height);
				ctx.restore();
			}
		}
	}
}

function get_vol_ind(inst){
    if ((inst.nfs_data == "1")&&(inst.nfs_tools == "1")&&(inst.nfs_indices=="1")&&(inst.nfs_sge=="1")){
        return 'green';
    }
    if ((inst.nfs_data == "0")&&(inst.nfs_tools == "0")&&(inst.nfs_indices=="0")&&(inst.nfs_sge=="0")){
        return 'orange';
    }
    if ((inst.nfs_data == "-1")&&(inst.nfs_tools == "-1")&&(inst.nfs_indices=="-1")&&(inst.nfs_sge=="-1")){
        return 'red';
    }
    return 'gray';
}

function state_to_color(state){
  // Map a service state to a color with the following keys:
  // State -> Color
  //   0   -> gray
  //   1   -> green
  //   -1  -> red
  // other -> gray
  if (state == 1) {
    return 'green';
  }
  if (state == -1) {
    return 'red';
  }
  return 'gray';
}

// Build the HTML for the instance details panel/canvas
function buildWorkerInstanceDetails() {
        // Instance ID
        worker_details = "<li>" + instances[selected_instance].id + " (" + instances[selected_instance].alias + ")</li>";
        if ((instances[selected_instance].worker_status == "Creating") ||
                        (instances[selected_instance].public_ip == null) ||
                        (instances[selected_instance].public_ip == "")) {
                // There's no IP address available (yet)
                worker_details += "<li>&nbsp;</li>";
                // Instance state
                worker_details += "<li>State: " + instances[selected_instance].worker_status + "</li>";
                // Time alive
                worker_details += "<li>Alive: 00:00:00</li>";
        } else {
                // Instance IP
                worker_details += "<li>(" + instances[selected_instance].public_ip + ")</li>";
                // Instance state
                worker_details += "<li>State: " + instances[selected_instance].worker_status + "</li>";
                // Time alive
                worker_details += "<li>" + drawAliveTime() + "</li>";
        }
        // Instance type
        worker_details += "<li>Type: " + instances[selected_instance].instance_type + "</li>";
        // Instance load
        worker_details += getLoadForDisplay(instances[selected_instance].ld);
        // Blank line
        // worker_details += "<li>&nbsp;</li>";
        worker_details += "<li>";
        worker_details += "<div id='instance_status_icons'>";
        if (instances[selected_instance].worker_status == "Creating") {
          // The instance is being created so indicate that there is no status data (yet)
          // Filesystem status
          worker_details += "<div title=\"Filesystems\"><i class='fa fa-circle' style='color: gray'></i></div>";
          // Permissions status
    	    worker_details += "<div title=\"Permissions\"><i class='fa fa-circle' style='color: gray'></div>";
          // Scheduler status
    	    worker_details += "<div title=\"Scheduler\"><i class='fa fa-circle' style='color: gray'></div>";
        } else {
          // Filesystem status
          worker_details += "<div title=\"Filesystems\"><i class='fa fa-circle' style='color: " + get_vol_ind(instances[selected_instance]) + "'></i></div>";
          // Permissions status
    	    worker_details += "<div title=\"Permissions\"><i class='fa fa-circle' style='color: " + state_to_color(parseInt(instances[selected_instance].get_cert)) + "'></i></div>";
          // Scheduler status
    	    worker_details += "<div title=\"Scheduler\"><i class='fa fa-circle' style='color: " + state_to_color(parseInt(instances[selected_instance].slurmd_running)) + "'></i></div>";
        }
        // Reboot button
        worker_details += "<img src=\"/cloud/static/images/reboot.png\" id=\"instance_reboot_icon\" title=\"Reboot instance\" alt=\"Reboot instance\" onclick=\"return rebootInstance('" + instances[selected_instance].id + "')\">&nbsp;";
        // Terminate button
        worker_details += "<img src=\"/cloud/static/images/terminate.png\" id=\"instance_terminate_icon\" title=\"Terminate instance\" alt=\"Terminate instance\" onclick=\"return terminateInstance('" + instances[selected_instance].id + "')\">";
        worker_details += "</div>";
        worker_details += "</li>";

        return worker_details;
}

function drawAliveTime() {
        var time_string = "";
        var time = Math.floor(instances[selected_instance].time_in_state);
        var hours = Math.floor(time / 3600);

        if (hours >= 24) {
                // More than a day
                var days = Math.floor(hours / 24);
                time_string = days + " day";
                if (days > 1) {
                        time_string += "s";
                }
        } else if (hours >= 168) {
                // More than a week
                var weeks = Math.floor(hours / 168);
                time_string = weeks + " week";
                if (weeks > 1) {
                        time_string += "s";
                }
        } else {
                // Less than a day
                time -= (hours * 60 * 60);
                var minutes = Math.floor(time/60);
                time -= (minutes * 60);
                var seconds = Math.floor(time);
                time_string = "<span id='master_stopwatch'>" + ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2) + "</span>";
        }
        return "Alive: " + time_string;
}

// Expects system load in format "0.00 0.02 0.39" for the past 1, 5, and 15 minutes, respectively
// Returns the load, as a percentage, for the last 5 minutes
function getLoadForDisplay(load_string) {
        load = 0;
        if (typeof load_string === "string") {
                load = load_string.split(" ")[1];
        }
       return "<li title=\"Average instance load in the past 5 minutes\">Load: " + (Math.floor(load * 100) + "%") + "</li>";
}

function refreshTip(){
    if (selected_instance != -1 && selected_instance < instances.length){
        if (selected_instance == 0){
            i_str = "<ul>";
            i_str += "<li><b>Master Node</b></li><li>&nbsp;</li>";
            i_str += "<li><b>" + instances[selected_instance].id + "</b></li>";
            i_str += "<li>(" +  instances[selected_instance].public_ip + ")</li>";
            i_str += "<li>" + drawAliveTime() + "</li>";
            i_str += "<li>Type: " + instances[selected_instance].instance_type + "</li>";
            // Instance load
            i_str += getLoadForDisplay(instances[selected_instance].ld);
        }
        else{
            // Show worker instance information
            i_str = "<ul>" + buildWorkerInstanceDetails();
        }
        $('#cluster_view_tooltip').html(i_str);
    }else{
        if (use_autoscaling == true) {
            i_str = '<br/>Autoscaling is <span style="color: green;">on</span>.<br/> Turn <a id="toggle_autoscaling_link" style="text-decoration: underline; cursor: pointer;">off</a>?'
            i_str += '<p>Min nodes: <a class="editable">' + as_min + '</a>'
            i_str += '<br/>Max nodes: <a class="editable">' + as_max + '</a>'
            i_str += '<br/><span id="adjust_autoscaling_link" style="text-decoration: underline; cursor:pointer;">Adjust limits?</span></p>'
        } else {
            i_str = '<br/><br/>Autoscaling is <span style="color: red;">off</span>.<br/> Turn <a id="toggle_autoscaling_link" style="text-decoration: underline; cursor: pointer;">on</a>?'
    	}
    	$('#cluster_view_tooltip').html(i_str);

        start_instance_timer();

        $('#toggle_autoscaling_link').click(function(){
    		$('#overlay').show();
    		if (use_autoscaling == true) {
    			$('#turn_autoscaling_off').show();
    		} else {
    			$('#turn_autoscaling_on').show();
    		}
        });
        $('#adjust_autoscaling_link').click(function(){
    		$('#overlay').show();
    		if (use_autoscaling == true) {
    			$('#adjust_autoscaling').show();
    		}
    	});
    }
}

function terminateInstance(instanceid) {
        // root/remove_instance?instance_id=instanceid
        if (confirm("Terminate instance " + instanceid + "?")) {
                $.getJSON('/cloud/root/remove_instance?instance_id=' + instanceid,
                        function(result) {
                        }
                );
        }
        return true;
}

function rebootInstance(instanceid) {
        // root/reboot_instance?instance_id=instanceid
        if (confirm("Reboot instance " + instanceid + "?")) {
                $.getJSON("/cloud/root/reboot_instance?instance_id=" + instanceid,
                        function(result) {
                        }
                );
        }
        return true;
}

// Get the co-ordinates of an event, relative to the event target
// Apapted from: http://stackoverflow.com/questions/55677/how-do-i-get-the-coordinates-of-a-mouse-click-on-a-canvas-element
function relMouseCoords(event){
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = event.target;

    do{
        totalOffsetX += currentElement.offsetLeft;
        totalOffsetY += currentElement.offsetTop;
    }
    while(currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return {x:canvasX, y:canvasY}
}
HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;

// Callback for a click with the cluster_canvas
$('#cluster_canvas').click(function(eventObj){
        // Get the co-ordinates of the click within the cluster_canvas
        c_x = relMouseCoords(eventObj).x;
        c_y = relMouseCoords(eventObj).y;

        // Check whether an instance has been hit
	for (i = 0; i < instances.length; i++){
		if (c_x >= x_offset + instances[i].b_x &&
			c_x <= x_offset + instances[i].b_xdx &&
			c_y >= y_offset + instances[i].b_y &&
			c_y <= y_offset + instances[i].b_ydy){
			    if (i == selected_instance){
                    selected_instance = -1;
                    refreshTip();
			    }
			    else{
			        selected_instance = i;
                    refreshTip();
			    }
			}
	}
	renderGraph();
        start_instance_timer();
});

// This is called when a node it added by the user.
// Causes expected pending instances to be drawn, making the
// GUI more responsive for the user.
function increment_pending_instance_count(num_new_nodes, lifecycle) {
        // Keep track of the current number of instances
        old_instance_length = instances.length;
        // Flag that there are going to be pending instances drawn
        pending_instance = true;
        // Keep track of the number of pending instances that we will need to draw
        num_pending_instances = num_pending_instances + num_new_nodes;
        // Differentiate between different instance lifecycle types
        inst_lifecycle = lifecycle;
        // Update the cluster canvas
        window.setTimeout(update_cluster_canvas, 1);
}

function update_cluster_canvas(){
	// Perform get, update instances {} and then call for a graph redraw
	$.getJSON('/cloud/instance_feed_json', function(data) {
	    if(data) {
	        instances = data.instances;
    		for (i= 0; i< instances.length; i++){
    			instances[i].b_x = 0;
				instances[i].b_y = 0;
				instances[i].b_xdx = 0;
				instances[i].b_ydy = 0;
    		}

	    }
	    else {
    		instances = [];
	    }

            // If there are pending instances then update the number we will
            // need to draw
            if (pending_instance == true) {
                    if (old_instance_length < instances.length) {
                            // New instances have arrived
                            // Need to decrement number of pending instances
                            var difference = instances.length - old_instance_length;
                            num_pending_instances = num_pending_instances - difference;
                            if (num_pending_instances == 0) {
                                    pending_instance = false;
                            }

                    }
            }
            // Set the old length equal to the new length
            old_instance_length = instances.length;

            // Add the pending instances
	    if (num_pending_instances > 0) {
                    // Create a "dummy" pending instance
                    new_instance = new Object();
                    // worker_status is used to color instances and color depends on instance lifecycle
                    if (inst_lifecycle == 'spot') {
                        new_instance.worker_status = "open";
                    } else {
                        new_instance.worker_status = "Creating";
                    }
                    new_instance.instance_state = "creating";
                    new_instance.ld = "0 0 0";
                    new_instance.time_in_state = "0";
                    new_instance.id = "i-00000000";
                    new_instance.instance_type = "Unknown";

                    // Add the dummy pending instance to the list of instances to be drawn
                    var i = 0;
                    for (i = 0; i < num_pending_instances; i++) {
                        instances.push(new_instance);
                    }
            }

	    renderGraph();
	    refreshTip();
            start_instance_timer();
	    window.setTimeout(update_cluster_canvas, 10000);
	});
}

function start_instance_timer() {
        if (selected_instance >= 0) {
                $('#master_stopwatch').stopwatch({
                        startTime: instances[selected_instance].time_in_state * 1000
                }).stopwatch('start');
        }
}

$(document).ready(function(){
	initCanvas();
	if (TESTING == true){
		renderGraph();
	}else{
		update_cluster_canvas();
	}
});

