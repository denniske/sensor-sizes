
export const empty = 2;

// function getPmm(my_diag) {
//
//     swidth = screen.width;
//     sheight = screen.height;
//
//     if(!my_diag) {
//
//         // default ppi - 106
//         diag = Math.ceil((Math.sqrt(screen.width * screen.width + screen.height * screen.height)/106)*10)/10;
//
//         // default diagonals based on user agent
//         if(navigator.userAgent.match(/Slate 7/))
//             diag = 7;
//         else if(navigator.userAgent.match(/iPad/))
//             diag = 9.7;
//         else if(navigator.userAgent.match(/iPhone/))
//             diag = 4.7;
//     } else {
//         diag = my_diag;
//     }
//
//
//
//     // calculating ppi and pixels per mm
//     ppi = Math.ceil((Math.sqrt(screen.width * screen.width + screen.height * screen.height)/diag)*10)/10;
//     pmm = Math.ceil((ppi/25.4)*10)/10;
//
//     $(".diag").html(diag+'"');
//
// }
//
// function mmToPx() {
//     // sensor size in mm
//     var sensor_width = $(".sensor_size").attr('data-swidth');
//     var sensor_height = $(".sensor_size").attr('data-sheight');
//     var sensor_width1 = $(".sensor_size1").attr('data-swidth');
//     var sensor_height1 = $(".sensor_size1").attr('data-sheight');
//     var sensor_width2 = $(".sensor_size2").attr('data-swidth');
//     var sensor_height2 = $(".sensor_size2").attr('data-sheight');
//
//     $(".sensor_size").css('width',(sensor_width*pmm)+'px');
//     $(".sensor_size").css('height',(sensor_height*pmm)+'px');
//     $(".sensor_size1").css('width',(sensor_width1*pmm)+'px');
//     $(".sensor_size1").css('height',(sensor_height1*pmm)+'px');
//     $(".sensor_size2").css('width',(sensor_width2*pmm)+'px');
//     $(".sensor_size2").css('height',(sensor_height2*pmm)+'px');
//
//     $(".sensor_size_compare").each(function(){
//         var sensor_width3 = $(this).attr('data-swidth');
//         var sensor_height3 = $(this).attr('data-sheight');
//
//         $(this).css('width',(sensor_width3*pmm)+'px');
//         $(this).css('height',(sensor_height3*pmm)+'px');
//     });
//
// }
//
// function replaceComma(n) {
//     n = n.replace(',','.');
//     return n;
// }
