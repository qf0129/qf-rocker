function QfRocker(obj_id, option_json) {
    var opt = document.getElementById(obj_id);
    opt.style.position = 'relative';
    opt.style.display = 'inline-block';
    console.log(opt.clientWidth, opt.clientHeight);
    var default_w = '100px';
    var default_h = '100px';
    if (option_json.shape=='circle'){
        if(opt.clientWidth==0){
            opt.style.width='100px';
        }
        if(opt.clientHeight==0){
            opt.style.height='100px';
        }
        if (opt.clientWidth > opt.clientHeight){
            opt.style.width=opt.clientHeight + 'px';
        }
        if (opt.clientHeight > opt.clientWidth){
            opt.style.height=opt.clientWidth + 'px';
        }
    }

    opt.style.border = '1px solid #999';
    opt.style.borderRadius = '100px';
    opt.innerHTML = '<div class="rocker_dot" style="position: absolute;display: inline-block;width: 60px;height: 60px;border-radius: 30px;background: #666;"></div>';

    var dot = document.querySelector('#'+ obj_id + ' .rocker_dot');

    var container_w = opt.clientWidth;
    var container_h = opt.clientHeight;
    var dot_w = parseInt(dot.style.width);
    var dot_h = parseInt(dot.style.height);
    var dot_center_x = opt.offsetLeft + container_w/2;
    var dot_center_y = opt.offsetTop + container_w/2;

    var is_click = false;
    var click_x = 0, click_y = 0;
    reset_loc();


    console.log('container_top:'+opt.offsetTop);
    console.log('container_left:'+opt.offsetLeft);
    console.log('dot_top:'+dot.offsetTop);
    console.log('dot_left:'+opt.offsetLeft);
    dot.onmousedown = function(e){
        is_click = true;
        click_x = e.offsetX;
        click_y = e.offsetY;
    };
    dot.onmouseup=function(e){
        reset_loc();
    };
    dot.onmouseleave = function(e){
        reset_loc();
    }
    dot.onmousemove = function(e){
        if (!is_click){return};
        var d = get_distance(dot_center_x, dot_center_y, e.clientX, e.clientY) ;
        if (d < container_h/2){
            dot.style.top =  e.clientY - opt.offsetTop - click_y + 'px';
            dot.style.left =  e.clientX - opt.offsetLeft - click_x + 'px';
            dot.style.backgroundColor = 'blue';
        }else{
            opt.style.border = '2px solid blue';
            opt.style.boxShadow = '0 0 10px blue';
        }
    };
    function reset_loc(){
        is_click = false;
        dot.style.top = (container_h - dot_h)/2 + 'px';
        dot.style.left = (container_w - dot_w)/2 + 'px';
        dot.style.backgroundColor = '#666';
        opt.style.border = '1px solid #999';
        opt.style.boxShadow = null;
    }
}
function get_distance( x1,  y1,  x2,  y2){
    d2 = (x1-x2)*(x1-x2)+(y1-y2)*(y1-y2)
    if (d2>0){
        return Math.sqrt(d2);
    }else{
        return 0;
    }
}