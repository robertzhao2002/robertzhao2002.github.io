var honors = {'a': 5, 'am': 4.7, 'bp': 4.3, 'b': 4, 'bm': 3.7, 'cp': 3.3, 'c': 3, 'cm': 2.7, 'd': 1.3, 'f': 0};
var regular = {'a': 4.3, 'am': 4, 'bp': 3.7, 'b': 3.3, 'bm': 3, 'cp': 2.7, 'c': 2.3, 'cm': 2, 'd': 1.3, 'f': 0};
var unweighted = {'a': 4, 'am': 3.7, 'bp': 3.3, 'b': 3, 'bm': 2.7, 'cp': 2.3, 'c': 2, 'cm': 1.7, 'd': 1, 'f': 0};

var classes = [];
var div_id = 0;
var defaultclass = $('#default');
defaultclass.hide();
$(document).ready(function(){

    var formdiv = $("#0");
    formdiv.prepend("<h2 id='number' style='color:white'>" + (div_id+1).toString() + "</h2>");
    classes.push(formdiv);

    $("#AddClass").click(function(){
        div_id = classes.length;
        var cln = defaultclass.clone();
        cln.append("<button class='btn btn-danger' type='button' id='RemoveClass' onclick='remove_class(" + div_id.toString() + ")'>Remove Class</button>");
        cln.attr("id", div_id.toString());
        cln.attr("name", div_id.toString())
        cln.show();
        cln.appendTo($("form"));
        $('#' +div_id.toString() + ' #number').remove();
        cln.prepend("<h2 id='number' style='color:white'>" + (div_id+1).toString() + "</h2>");
        classes.push(cln);
    });

    $("#displaya").click(function(){
        var gpoint = [];
        var credits = [];
        var weighted = $("#theForm #weight").prop('checked');
        if(weighted == true)
        {
            for(let i = 0; i < classes.length; i++)
            {
                var h = $('#' + i.toString()+ ' #HA').prop('checked');
              console.log(h);
                if(h)
                {
                    gpoint.push(honors[$('#' + i.toString() + ' #G').val()]);
                }
                else
                {
                    gpoint.push(regular[$('#' + i.toString() + ' #G').val()]);
                }
                credits.push(parseFloat($('#' + i.toString() + ' #C').val()));
            }
        }
        else
        {
            for(let i = 0; i < classes.length; i++)
            {
                gpoint.push(unweighted[$('#' + i.toString() + ' #G').val()]);
                credits.push(parseFloat($('#' + i.toString() + ' #C').val()));
            }
        }
        var GPA = multiplySum(gpoint, credits)/sumList(credits);
        if($('body #gradepointaverage').val() !== 'undefined')
            $('body #gradepointaverage').remove();
        $('body').prepend("<h1 class='mx-5 mt-5 text-white' id='gradepointaverage'>" + GPA.toFixed(3).toString() + '</h1>');
        $('body').scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });
});

function sumList(l)
{
    var total = 0;
    for(let i = 0; i < l.length; i++)
    {
        total+=l[i];
    }
    return total;
}

function multiplySum(a, b)
{
    for(let i = 0; i < a.length; i++)
    {
        a[i] = a[i]*b[i];
    }
    return sumList(a);
}

function remove_class(toRemove)
{
    $("#" + toRemove.toString()).remove();
    classes.splice(toRemove, 1);
    for(let i = 0; i < classes.length; i++)
    {
        classes[i].attr("id", i.toString());
        classes[i].attr("name", i.toString());
    }
    for(let i = 0; i < classes.length; i++)
    {
        $('#' + i.toString() + ' #number').remove();
        $('#' + i.toString()).prepend("<h2 id='number' style='color:white'>" + (i+1).toString() + "</h2>");
    }
  for(let i = 1; i < classes.length; i++)
    {
        $('#' + i.toString() + ' #RemoveClass').remove();
        $('#' + i.toString()).append("<button type='button' class='btn btn-danger' id='RemoveClass' onclick='remove_class(" + i.toString() + ")'>Remove Class</button>");
    }
}