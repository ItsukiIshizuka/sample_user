// $(function(){
//   //category
//   function appendOption_c(category){ // optionの作成
//     let html = `<option value="${category.id}">${category.name}</option>`;
//     return html;
//   }
//   //delivery
//   function appendOption_d(delivery){ // optionの作成
//     let html = `<option value="${delivery.id}">${delivery.responsibility}</option>`;
//     return html;
//   }

//   function appendChidrenBox(insertHTML){ // 子セレクトボックスのhtml作成
//     let childSelectHtml = '';
//       childSelectHtml = `<div class='product-select-wrapper' id= 'children_wrapper'>
//                         <div class='product_category-select'>
//                         <select class="category_select-box" id="child_category" name="product[category_id]">
//                         <option value="---">---</option>
//                         ${insertHTML}
//                         </select>
//                         <i class='fa fa-chevron-down'></i>
//                         </div>
//                         <div class= 'product_select-grandchildren'>
//                         </div>
//                         </div>`;
//     $('.product_select-children').append(childSelectHtml);
//   }
//   function appendgrandChidrenBox(insertHTML){ // 孫セレクトボックスのhtml作成
//     let grandchildrenSelectHtml = '';
//     grandchildrenSelectHtml = `<div class='product-select-wrapper' id= 'grandchildren_wrapper'>
//                               <div class='product_category-select'>
//                               <select class="category_select-box" id="grandchild_category" name="product[category_id]">
//                               <option value="---">---</option>
//                               ${insertHTML} 
//                               </select>
//                               <i class='fa fa-chevron-down'></i>
//                               </div>
//                               <div class= 'product_select-grandchildren'>
//                               </div>
//                               </div>`;
//     $('.product_select-grandchildren').append(grandchildrenSelectHtml);
//   }

//   function appendDeliveryChildrenBox(insertHTML){ // 孫セレクトボックスのhtml作成
//     let deliverychildrenSelectHtml = '';
//     deliverychildrenSelectHtml = `<div class="product_delivery-responsibility">
//                                   <select class="delivery_select-box" id="way_select" name="product[delivery_id]"><option value="">---</option>
//                                   ${insertHTML}
//                                   </div>
//                                   <div class="product_delivery-way"></div>
//                                   `;
//     $('.product_delivery-way').append(deliverychildrenSelectHtml);
//   }



//   $(document).on('change', '#category_select', function(){  // 親セレクトボックスの選択肢を変えたらイベント発火
//     let productcategory = document.getElementById('category_select').value; //
//   // ↑ productcategoryに選択した親のvalueを代入
//     if (productcategory != ''){
//  // ↑ productcategoryが空ではない場合のみAjax通信を行う｡選択肢を初期選択肢'---'に変えると､通信失敗となってしまうため｡
//       $.ajax({
//         url: 'category_children',
//         type: 'GET',
//         data: { productcategory: productcategory },
//         dataType: 'json'
//       })
//       .done(function(children){  // 送られてきたデータをchildrenに代入
//         let insertHTML = '';
//         children.forEach(function(child){  
//   // forEachでchildに一つずつデータを代入｡子のoptionが一つずつ作成される｡
//           insertHTML += appendOption_c(child); 
//         });
//         appendChidrenBox(insertHTML); 
//         $(document).on('change', '#category_select', function(){
//   // 通信成功時に親の選択肢を変えたらイベント発火｡子と孫を削除｡selectのidにかけるのではなく､親要素にかけないと残ってしまう
//           $('#children_wrapper').remove(); 
//           $('#grandchildren_wrapper').remove();
//         })
//       })
//       .fail(function(){
//         alert('カテゴリー取得に失敗しました');
//       })
//     }
//   });


//   // document､もしくは親を指定しないと発火しない
//   $(document).on('change', '#child_category', function(){
//     let productcategory = document.getElementById('child_category').value;
//     if (productcategory != ''){
//       $.ajax ({
//         url: 'category_grandchildren',
//         type: 'GET',
//         data: { productcategory: productcategory },
//         dataType: 'json'
//       })
//       .done(function(grandchildren){
//         let insertHTML = '';
//         grandchildren.forEach(function(grandchild){
//           insertHTML += appendOption_c(grandchild);
//         });
//         appendgrandChidrenBox(insertHTML);  
//         $(document).on('change', '#child_category',function(){
//           $('#grandchildren_wrapper').remove();
//           })
//         })  
//       .fail(function(){
//         alert('カテゴリー取得に失敗しました');
//       })
//     }
//   });

//   // delivery
//   $(document).on('change', '#delivery_select', function(){  // 親セレクトボックスの選択肢を変えたらイベント発火
//     let productdelivery = document.getElementById('delivery_select').value;
//     if (productdelivery != ''){
//       $.ajax  ({
//         url: 'delivery_children',
//         type: 'GET',
//         data: { productdelivery: productdelivery },
//         dataType: 'json'
//       })
//       .done(function(deliveries){  // 送られてきたデータをchildrenに代入
//         let insertHTML = '';
//         deliveries.forEach(function(delivery){
//           insertHTML += appendOption_c(delivery);
//         });
//         appendDeliveryChildrenBox(insertHTML); 
//         $(document).on('change', '#delivery_select', function(){
//   // 通信成功時に親の選択肢を変えたらイベント発火｡子と孫を削除｡selectのidにかけるのではなく､親要素にかけないと残ってしまう
//           $('#way_select').remove(); 
//         })
//       })
//       .fail(function(delivery){
//         alert('カテゴリー取得に失敗しました');
//       });
//     }
//   //delivery  
//   });
// });


//images
$(document).on('turbolinks:load', function(){
  var dropzone = $('.dropzone-area');
  var dropzone2 = $('.dropzone-area2');
  var dropzone_box = $('.dropzone-box');
  var images = [];
  var inputs  =[];
  var input_area = $('.input_area');
  var preview = $('#preview');
  var preview2 = $('#preview2');

  $(document).on('change', 'input[type= "file"].upload-image',function(event) {
    var file = $(this).prop('files')[0];
    var reader = new FileReader();
    inputs.push($(this));
    var img = $(`<div class= "img_view"><img height="100" width="100"></div>`);
    reader.onload = function(e) {
      var btn_wrapper = $('<div class="btn_wrapper"><div class="btn edit">編集</div><div class="btn delete">削除</div></div>');
      img.append(btn_wrapper);
      img.find('img').attr({
        src: e.target.result
      })
    }
    reader.readAsDataURL(file);
    images.push(img);

    if(images.length == 5) {
      dropzone2.css({
        'display': 'block'
      })
      dropzone.css({
        'display': 'none'
      })
    }
    if(images.length >= 6){
      $.each(images, function(index, image) {
        image.attr('data-image', index);
        let data = image.data('image')
        if (data >= 5){
          preview2.append(image);
          dropzone2.css({
            'width': `calc(100% - (135px * ${images.length - 5}))`
          })
        }
      })
    } else {
        $('#preview').empty();
        $.each(images, function(index, image) {
          image.attr('data-image', index);
          preview.append(image);
        })
        dropzone.css({
          'width': `calc(100% - (135px * ${images.length}))`
        })
      }
    if(images.length == 10) {
      dropzone2.css({
        'display': 'none'
      })
      return;
    }
    var new_image = $(`<input multiple= "multiple" name="product_images[:image][]" class="upload-image" data-image= ${images.length} type="file" id="upload-image">`);
    input_area.prepend(new_image);
  });

  $(document).on('click', '.delete', function() {
    var target_image = $(this).parent().parent();
    $.each(inputs, function(index, input){
      if ($(this).data('image') == target_image.data('image')){
        $(this).remove();
        target_image.remove();
        var num = $(this).data('image');
        images.splice(num, 1);
        inputs.splice(num, 1);
        if(inputs.length == 0) {
          $('input[type= "file"].upload-image').attr({
            'data-image': 0
          })
        }
      }
    })
    
    $('input[type= "file"].upload-image:first').attr({
      'data-image': inputs.length
    })

    $.each(inputs, function(index, input) {
      var input = $(this)
      input.attr({
        'data-image': index
      })
      $('input[type= "file"].upload-image:first').after(input)
    })
    if (images.length == 5) {
      dropzone2.css({
        'display': 'block'
      })
      dropzone.css({
        'display': 'none'
      })
    }
    if (images.length >= 6) {
      $.each(images, function(index, image) {
        image.attr('data-image', index);
        let data = image.data('image')
        if (data >= 5){
          preview2.append(image);
          dropzone2.css({
            'width': `calc(100% - (135px * ${images.length - 5}))`
          })
        }
      })
    } else {
      $.each(images, function(index, image) {
        image.attr('data-image', index);
        preview.append(image);
      })
      dropzone.css({
        'width': `calc(100% - (135px * ${images.length}))`
      })
    }
    if(images.length == 4) {
      dropzone2.css({
        'display': 'none'
      })
      dropzone.css({
        'display': 'block'
      })
    }
  })
});