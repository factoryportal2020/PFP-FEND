var shop_search_result="shop_search_index";

var shop_detail = "shop_detail";
var set_dining_cafe_done = 1;
/**
 * 店舗検索
 * @author shinya.saiho
 */

/**
 * フリーワード検索
 * @param	void
 */
function search_keyword(){
	if(typeof $("#keyword").val() === 'undefined' || $("#keyword").val() == ''){
		return false;
	}
	//window.location.replace('/'+shop_search_result+'/keyword/' + $("#keyword").val());
	data = encodeURIComponent($("#keyword").val());
	url ='/'+shop_search_result+'/keyword/' + data;
	$(location).attr('href',url);

}

/**
 * カテゴリ検索
 * @param	void
 */
function search_category(){
	if(typeof $("input:radio[name='item']:checked").val() === 'undefined' || $("input:radio[name='item']:checked").val() == ''){
		return false;
	}
	//window.location.replace('/'+shop_search_result+'/category/' + $("input:radio[name='category']:checked").val());
	url ='/'+shop_search_result+'/category/' + $("input:radio[name='item']:checked").val();
	$(location).attr('href',url);
}

/**
 * 取扱商品検索
 * @param	void
 */
function search_goods_category(){
	if(typeof $("input:radio[name='cat']:checked").val() === 'undefined' || $("input:radio[name='cat']:checked").val() == ''){
		return false;
	}
	//window.location.replace('/'+shop_search_result+'/category/' + $("input:radio[name='category']:checked").val());
	url ='/'+shop_search_result+'/goods_category/' + $("input:radio[name='cat']:checked").val();
	$(location).attr('href',url);
}

/**
 * 50音検索検索
 * @param	void
 */
function search_kana(){
	if(typeof $("input:radio[name='kana']:checked").val() === 'undefined' || $("input:radio[name='kana']:checked").val() == ''){
		return false;
	}
	//window.location.replace('/'+shop_search_result+'/kana/' + $("input:radio[name='kana']:checked").val());
	url = '/'+shop_search_result+'/kana/' + $("input:radio[name='kana']:checked").val();
	$(location).attr('href',url);

}

/**
 * フリーワード検索
 * @param	void
 */
function smp_search_keyword(){
	if(typeof $("#searchtxt").val() === 'undefined' || $("#searchtxt").val() == ''){
		return false;
	}
	//window.location.replace('/'+shop_search_result+'/keyword/' + $("#keyword").val());
	url ='/smp/'+shop_search_result+'/keyword/' + $("#searchtxt").val();
	$(location).attr('href',url);

}

/**
 * カテゴリ検索
 * @param	void
 */
function smp_search_category(){
	if(typeof $("input:radio[name='category']:checked").val() === 'undefined' || $("input:radio[name='category']:checked").val() == ''){
		return false;
	}
	//window.location.replace('/'+shop_search_result+'/category/' + $("input:radio[name='category']:checked").val());
	url ='/smp/'+shop_search_result+'/category/' + $("input:radio[name='category']:checked").val();
	$(location).attr('href',url);
}

/**
 * 取扱商品検索
 * @param	void
 */
function smp_search_goods_category(){
	if(typeof $("input:radio[name='product']:checked").val() === 'undefined' || $("input:radio[name='product']:checked").val() == ''){
		return false;
	}
	//window.location.replace('/'+shop_search_result+'/category/' + $("input:radio[name='category']:checked").val());
	url ='/smp/'+shop_search_result+'/goods_category/' + $("input:radio[name='product']:checked").val();
	$(location).attr('href',url);
}

/**
 * 50音検索検索
 * @param	void
 */
function smp_search_kana(){
	if(typeof $("input:radio[name='initials']:checked").val() === 'undefined' || $("input:radio[name='initials']:checked").val() == ''){
		return false;
	}
	//window.location.replace('/'+shop_search_result+'/kana/' + $("input:radio[name='kana']:checked").val());
	url = '/smp/'+shop_search_result+'/kana/' + $("input:radio[name='initials']:checked").val();
	$(location).attr('href',url);

}
/*
 * shop_search用js
 *
 * Copyright 2012, k
 */

var count_stuff = 0;
var ajax_status_shop = 'standby';
jQuery.shop_search = {
	debug:{
		debug1:false,
		debug2:false
	},
	config:{
		event_search:"",
		event_func:"",
		event_limit:"5",
		event_container : "",
		total_count: 0,
		total_page: 0,
		current_page: 1
	}
	,init : function(){
		var url = document.location.href;
		var result_keyword_ = new RegExp(shop_search_result+"/keyword/", "i");
		var result_kana_=  new RegExp(shop_search_result+"/kana/", "i");
		var result_category_ =new RegExp(shop_search_result+"/category/", "i");
		var result_good_category_ =new RegExp(shop_search_result+"/goods_category/", "i");
		var dontdoit= 1;
		// console.log(url);
		if (url.match(result_keyword_)) {
			//alert("keyword:" + RegExp.rightContext);
			$.shop_search.config.event_func = "keyword";
			$.shop_search.config.event_search = RegExp.rightContext.split("#")[0];
		}else if (url.match(result_kana_)) {
			//	alert("kana:"+ RegExp.rightContext);
			$.shop_search.config.event_func = "kana";
			$.shop_search.config.event_search = RegExp.rightContext.split("#")[0];
		}else if (url.match(result_category_)) {
			//alert("category:"+ RegExp.rightContext);
			$.shop_search.config.event_func = "category";
			$.shop_search.config.event_search = RegExp.rightContext.split("#")[0];
			// $.shop_search.config.current_page = 1;
		}else if (url.match(result_good_category_)) {
			//alert("category:"+ RegExp.rightContext);
			$.shop_search.config.event_func = "goods_category";
			$.shop_search.config.event_search = RegExp.rightContext.split("#")[0];
		}else{
			dontdoit = 0;
		}
		if(dontdoit == 1){
			//var url="/api/shopSearch.php?func="+this.config.event_func+"&search="+this.config.event_search+"&limit="+this.config.event_limit;
			$.shop_search.run($.shop_search.getUrl());
		}
		$('#search_shop_continues').bind('click',function(){
			$.shop_search.getContinues();
			return false;
		});
	}
	,smp_init : function($container, f){
		var url = document.location.href;
		//alert(url);
		var result_keyword_ = new RegExp(shop_search_result+"/keyword/", "i");
		var result_kana_=  new RegExp(shop_search_result+"/kana/", "i");
		var result_category_ =new RegExp(shop_search_result+"/category/", "i");
		var result_good_category_ =new RegExp(shop_search_result+"/goods_category/", "i");
		var dontdoit= 1;
		if (url.match(result_keyword_)) {
			//alert("keyword:" + RegExp.rightContext);
			$.shop_search.config.event_func = "keyword";
			$.shop_search.config.event_search = RegExp.rightContext;
		}else if (url.match(result_kana_)) {
			//	alert("kana:"+ RegExp.rightContext);
			$.shop_search.config.event_func = "kana";
			$.shop_search.config.event_search = RegExp.rightContext;
		}else if (url.match(result_category_)) {
			//alert("category:"+ RegExp.rightContext);
			$.shop_search.config.event_func = "category";
			$.shop_search.config.event_search = RegExp.rightContext;
		}else if (url.match(result_good_category_)) {
			//alert("category:"+ RegExp.rightContext);
			$.shop_search.config.event_func = "goods_category";
			$.shop_search.config.event_search = RegExp.rightContext;
		}else{
			dontdoit = 0;
		}
		if(dontdoit == 1){
			//var url="/api/shopSearch.php?func="+this.config.event_func+"&search="+this.config.event_search+"&limit="+this.config.event_limit;
			$.shop_search.smp_run($.shop_search.getSmpUrl(f), $container);
		}
//			$('#search_shop_continues').bind('click',function(){
//				$.shop_search.getContinues();
//			});
	}
	,setShopnews_row : function ( div_id,v){
		$('#search_shop_id','#'+div_id).attr('href',v.site_url);
		if(typeof v.shop_img1 === 'undefined' ||  v.shop_img1 == null || v.shop_img1 == ''){
			$('#search_shop_img','#'+div_id).html('');
			$('#search_shop_img','#'+div_id).css('border','none !important');
		}else{
			$('#search_shop_img > img','#'+div_id).attr('src', v.shop_img1);
		}
		$('#search_shop_name','#'+div_id).text(v.name);
		var goodsCategoryName = (typeof v.goods_category_name === 'undefined' || v.goods_category_name == "")?"":"["+ v.goods_category_name +"]" ;
		$('#search_shop_category','#'+div_id).text(v.category_name+ goodsCategoryName);
		if(typeof v.place ==='undefined' || v.place == '' || v.place == null){
			temp_v_place = "";
		}else{
			temp_v_place = v.place;
            if(temp_v_place=="CENTER" || temp_v_place=="center"){
                temp_v_place = "センター";
            }else if(temp_v_place=="EAST" || temp_v_place=="east"){
                temp_v_place = "イースト";
            }
            temp_v_place = "場所："+temp_v_place;
		}
		$('#search_shop_floor','#'+div_id).text(temp_v_place+" "+v.floor);
		//	$('#search_shop_introduction','#'+div_id).text(v.introduction);
		$('#search_shop_introduction','#'+div_id).html(v.introduction);
		$('#search_shop_building_category','#'+div_id).text(v.building_category_name);	// サイト名
		$('#search_shop_building_category','#'+div_id).addClass(this.getbuilding_category_class(v.building_category));

	}
	,setDinning_cafe_row : function ( div_id,v){
		console.log(div_id);
		console.log(v);
		if(typeof v.shop_img1 === 'undefined' || v.shop_img1 == ''){
			$('#dinning_cafe_og_image > img','#'+div_id).remove(); // chrome系は削除が必要
		}else{
			$('#dinning_cafe_og_image > img','#'+div_id).attr("src",v.shop_img1);
		}
		$('#dinning_cafe_virtual_row_id','#'+div_id).attr('href',v.site_url);
		$('#dinning_cafe_shop_name','#'+div_id).text(v.name);

		var temp_category = this.getbuilding_category_class(v.building_category);
		$('#dinning_cafe_building_category','#'+div_id).addClass(temp_category);
		$('#dinning_cafe_building_category','#'+div_id).text(v.building_category_name);
		if(typeof v.place ==='undefined' || v.place == '' || v.place == null){
			temp_v_place = "";
		}else{
			temp_v_place = v.place;
            if(temp_v_place=="CENTER" || temp_v_place=="center"){
                temp_v_place = "センター";
            }else if(temp_v_place=="EAST" || temp_v_place=="east"){
                temp_v_place = "イースト";
            }
		}
		$('#dinning_cafe_floor_place','#'+div_id).text(temp_v_place+" "+v.floor);
	}
	,getUrl : function(v){
		var url="/api/shopSearch.php?func="+this.config.event_func
			+"&search="+this.config.event_search;
		if($.shop_search.config.event_limit > 0){
			url =url + "&limit="+$.shop_search.config.event_limit;
		}
		if(typeof v ==='undefined' || v == '' || v == null){

		}else{
			url = url +"&offset="+count_stuff;
		}

		var hash_url = location.hash;
		hash_url = (hash_url.match(/^#tab\d+$/) || [])[0];

		console.log("hash_url")
		console.log(hash_url)
		if(hash_url!="undefined" && hash_url!=null){
			let tab_page = hash_url.split("tab")[1];
			console.log(tab_page)
			url = url +"&offset="+(tab_page-1)*$.shop_search.config.event_limit;
		}

		console.log("url");
		console.log(url);
		return url;
	}
	,getSmpUrl : function(f){
		var url="/api/shopSearch.php?func="	+this.config.event_func
			+"&search="	+this.config.event_search
			+ "&limit="	+$.shop_search.config.event_limit;
		if(typeof f ==='undefined' || f == '' || f == null){
			count_stuff = 0; // offset初期化
		}else if (f == "next"){
			url = url +"&offset="+count_stuff;
		}else if (f == "prev"){
			tempNo = count_stuff - this.config.event_limit * 2;
			if(tempNo > 0){
				url = url +"&offset="+ tempNo;
				count_stuff = tempNo;
			}else{
				url = url +"&offset=0";
				count_stuff = 0; // minusの場合
			}
		}

		return url;
	}

	,getContinues : function (){
		//var url="/api/shopSearch.php?func="+this.config.event_func+"&search="+this.config.event_search+"&limit="+this.config.event_limit+"&offset="+count_stuff;
		$.shop_search.run($.shop_search.getUrl(true));
	}
	,run : function(url) {
		if(this.debug.debug1){

		}else{
			var ret_str=''; // 初期化
			//alert('実行');
			//
			if(ajax_status_shop == 'standby'){
				ajax_status_shop = 'active';

				$.ajax({
					type: "GET",
					async: true,
					cache: false,
					url:url,
					// contentType: "application/json; charset=utf-8",
					//  data: continues,
					dataType: "json",
					success: function(response)
					{
						if(typeof response === "undefined" || response == null){

						}else{
							var shop_html = $('#search_shop_samples').html();
							var temp_datas = response[1];
							$('#search_shop_block_real').html('');
							for (key in temp_datas) {
								var duplicate_row_html = shop_html;
								var div_id = 'search_shop_block_'+count_stuff;

								// var odd_class = (count_stuff % 2 == 1)?"block_odd":"";

								$(duplicate_row_html).appendTo($('#search_shop_loop_temp'));		// 取り敢えず画面hiddenにセット
								// $('#search_shop_block_','#search_shop_loop_temp').addClass(odd_class);
								$('#search_shop_block_','#search_shop_loop_temp').attr('id', div_id);	// idを変換
								$.shop_search.setShopnews_row(div_id,temp_datas[key]);		// 情報をセットする。

								var temp_html = $('#search_shop_loop_temp').html();
								$(temp_html).appendTo($('#search_shop_block_real'));
								$('#'+div_id, '#search_shop_block_real').animate({opacity: 0}, 1);
								$('#'+div_id, '#search_shop_block_real').animate({opacity: 1}, 1000);
								$('#'+div_id,'#search_shop_loop_temp').remove();			// 画面hidden情報を削除
								count_stuff++;
							}
							//$(".shop_search__resultNum").text(response[0].totalCount);
$(".shop_search__resultNum").html(response[0].totalCount+' <span class="font_normal">件</span>');
							$.shop_search.config.total_count = response[0].totalCount;
							$.shop_search.config.total_page = Math.ceil($.shop_search.config.total_count / $.shop_search.config.event_limit);
							console.log($.shop_search.config.current_page);
							var pages = $.shop_search.pagination($.shop_search.config.current_page, $.shop_search.config.event_limit, $.shop_search.config.total_count);
							var prev = $.shop_search.config.current_page - 1;
							var next_page = parseInt($.shop_search.config.current_page) + 1;

							var pagination = $.shop_search.config.current_page == 1 ? '<li><button disabled><span class="icon-left"></span></button></li>' : '<li><button><span class="icon-left getRecords" page-id="' + prev + '"></span></button></li>';

							for (var i = 0; i <= pages.length; i++) {
								if (pages[i] !== undefined) {
									if (pages[i] == '...') {
										pagination += '<li>...</li>';
									} else {
										var current_class =  '';
										var paging_class =  '';
										if ($.shop_search.config.current_page == pages[i]) {
											pagination += '<li class="p-news__page_current"><a>' + pages[i] + '</a></li>';
										} else {
											paging_class = 'getRecords';
											pagination += '<li><a class="getRecords" page-id="' + pages[i] + '">' + pages[i] + '</a></li>';
										}
									}
								}
							}
							if ($.shop_search.config.total_page == $.shop_search.config.current_page || $.shop_search.config.total_count==0) {
								pagination += '<li><button disabled><span class="icon-right"></span></button></li>';
							} else {
								pagination += '<li><button><span class="icon-right getRecords" page-id="' + next_page + '"></span></button></li>';
							}
							$('.p-news__pagenation').html(pagination);
						}
					},
					complete:function(){
						// ajax制御解除
						ajax_status_shop = 'standby';

					},
					cache: false,
					error: function(response)
					{
						ajax_status_shop = 'standby';
					}
				});

			}
			return null;
		}
	}
	,smp_run : function(url, $container) {
		if(this.debug.debug1){

		}else{
			var ret_str=''; // 初期化
			//alert('実行');
			//
			if(ajax_status_shop == 'standby'){
				ajax_status_shop = 'active';

				$.ajax({
					type: "GET",
					async: true,
					cache: false,
					url:url,
					// contentType: "application/json; charset=utf-8",
					//  data: continues,
					dataType: "json",
					success: function(response)
					{
						if(typeof response === "undefined" || response == null){

						}else{
							if(response[0].count > 0){
								$container.html('');
							}
							var shop_html = $('#search_shop_samples').html();
							var temp_datas = response[1];
							for (key in temp_datas) {
								var duplicate_row_html = shop_html;
								var div_id = 'search_shop_block_'+count_stuff;

								//var odd_class = (count_stuff % 2 == 1)?"block_odd":"";

								$(duplicate_row_html).appendTo($('#search_shop_loop_temp'));		// 取り敢えず画面hiddenにセット
								//$('#search_shop_block_','#search_shop_loop_temp').addClass(odd_class);
								$('#search_shop_block_','#search_shop_loop_temp').attr('id', div_id);	// idを変換
								//$.shop_search.setShopnews_row(div_id,temp_datas[key]);		// 情報をセットする。
								v = temp_datas[key];
								$('#search_shop_id','#'+div_id).attr('href',v.site_url);

								$('#search_shop_img > img','#'+div_id).attr('src', v.shop_img1);
								$('#search_shop_name','#'+div_id).text(v.name);
								var goodsCategoryName = (typeof v.goods_category_name === 'undefined' || v.goods_category_name == "")?"":"["+ v.goods_category_name +"]" ;
								$('#search_shop_category','#'+div_id).text(v.category_name + goodsCategoryName );
								if(typeof v.place ==='undefined' || v.place == '' || v.place == null){
									temp_v_place = "";
								}else{
									temp_v_place = v.place;
								}
								$('#search_shop_floor','#'+div_id).text("場所 : "+v.floor+""+temp_v_place);

								temp_building_info = $.shop_search.getBuildingSmpDinningClass(v.building_category);
								$('#search_shop_building_category','#'+div_id).addClass(temp_building_info.id);
								$('#search_shop_building_category > img','#'+div_id).attr('src', temp_building_info.img).attr('alt',v.building_category_name);

								temp_building_img = $('#search_shop_building_category > img','#'+div_id);
								$('#search_shop_building_category','#'+div_id).text(v.building_category_name);
								$(temp_building_img).prependTo($('#search_shop_building_category','#'+div_id));

								temp_array = new Array($('#search_shop_category','#'+div_id)
									,$('#search_shop_floor','#'+div_id)
									, $('#search_shop_building_category','#'+div_id)
									,$('#search_shop_name','#'+div_id)
								);
								var html = v.introduction;
								var div = document.createElement("div");
								div.innerHTML = html;
								var text = div.textContent || div.innerText || "";
								temp_cut_intro = (text != null && text.length > 30)? text.substr(0,30):text;
								$('#search_shop_introduction','#'+div_id).text(temp_cut_intro+"...");
								/*$('#search_shop_introduction','#'+div_id).text(v.introduction)
                                .css({"text-overflow": "ellipsis"
                                    ,"-webkit-text-overflow": "ellipsis" // Safari
                                    ,"-o-text-overflow": "ellipsis" // Opera
                                    });
                */
								for(k in temp_array){
									$(temp_array[k]).prependTo($('#search_shop_introduction','#'+div_id));
								}

								ret_str= ret_str.concat($('#search_shop_loop_temp').html());		// ソースを一時格納
								$('#'+div_id,'#search_shop_loop_temp').remove();			// 画面hidden情報を削除
								count_stuff++;
							}

							var $temp_str = $(ret_str);
							$temp_str.animate({opacity: 0}, 1);
							setTimeout(function(){
								$temp_str.animate({opacity: 1}, 1000);
							},$temp_str.appendTo($container));
						}

					},
					complete:function(){
						// ajax制御解除
						ajax_status_shop = 'standby';

					},
					cache: false,
					error: function(response)
					{
						ajax_status_shop = 'standby';
					}
				});

			}
			return null;
		}
	}
	//
	,getListContinues : function (page_id){
		console.log(page_id);
		var url_list="/api/shopSearch.php?func="+$.shop_search.config.event_func
			+"&search="+$.shop_search.config.event_search
			+"&limit="+$.shop_search.config.event_limit;

		url_list = url_list +"&offset="+(page_id-1)*$.shop_search.config.event_limit;

		$.shop_search.config.current_page = page_id;
		//document.getElementById("top_of_page").scrollIntoView();
                $('html, body').animate({ scrollTop: 0 }, 500);
			// document.getElementById("dining_cafe__tabwrap").scrollIntoView();
		$.shop_search.run_dinning_cafe(url_list);
	},
	getShopSearchListContinues : function (page_id){
		console.log(page_id);
		var url_list="/api/shopSearch.php?func="+$.shop_search.config.event_func
			+"&search="+$.shop_search.config.event_search
			+"&limit="+$.shop_search.config.event_limit;

		url_list = url_list +"&offset="+(page_id-1)*$.shop_search.config.event_limit;

		$.shop_search.config.current_page = page_id;
		//document.getElementById("top_of_page").scrollIntoView();
                   $('html, body').animate({ scrollTop: 0 }, 500);
		// document.getElementById("search_shop_block_real").scrollIntoView();

		$.shop_search.run(url_list);
		var urltabing = document.location.href.split('#')[0]
      	document.location = urltabing+"#tab"+page_id;
	}
	// ダイニングカフェを取得する。
	,run_dinning_cafe : function($url) {
		let container = $('#cafe_container_all')
		container.html('');
		url = $url;
		console.log("url");
		console.log($url);
		if(ajax_status_shop == 'standby'){
			ajax_status_shop = 'active';
			set_dining_cafe_done = 1;
			$.ajax({
				type: "GET",
				async: true,
				cache: false,
				url:url,
				// contentType: "application/json; charset=utf-8",
				//  data: continues,
				dataType: "json",
				success: function(response)
				{
					console.log(response);
					response_data = response;
					$.shop_search.set_dinning_cafe(container, $.shop_search.config.event_search);
				},
				complete:function(){
					// ajax制御解除
					ajax_status_shop = 'standby';
					set_dining_cafe_done = 2;
				},
				cache: false,
				error: function(response)
				{
					ajax_status_shop = 'standby';
				}
			});

		}
		return null;
	}
	// ダイニングカフェをセットする。
	,set_dinning_cafe : function($container, goodCategory) {
		var ret_str=''; // 初期化
		var shop_news_html = $('#dinning_cafe_loop_text').html();
		response_count = response_data[0];
		response_data = response_data[1];
		if(typeof response_data === "undefined" || response_data == null){
        	var curTabName = $("#dining_cafe__tabwrap").find(".current").find('a').text();
			var noStore = '<li class="noborder"><p>現在、該当する店舗はありません （'+curTabName+'）</p></li>'
			$("#cafe_container_all").html(noStore);
			$('.p-news__pagenation').html("");
		}else{
			re = new RegExp(goodCategory, "i");
			console.log(re);
			$.shop_search.config.total_count = response_count.totalCount;
			// console.log($.shop_search.config);
			console.log(response_data);
			console.log(goodCategory);
			for (key in response_data) {
				console.log(response_data[key].goods_category);
				console.log(response_data[key].goods_category.match(re));
				if(goodCategory == '0' || response_data[key].goods_category.match(re)){
					var duplicate_row_html = shop_news_html;
					var div_id = 'dinning_cafe_row_'+count_stuff;
					$(duplicate_row_html).appendTo($('#dinning_cafe_loop_temp'));		// 取り敢えず画面hiddenにセット
					$('#dinning_cafe_row','#dinning_cafe_loop_temp').attr('id', div_id);	// idを変換
					$.shop_search.setDinning_cafe_row(div_id,response_data[key]);		// 情報をセットする。

					ret_str= ret_str.concat($('#dinning_cafe_loop_temp').html());		// ソースを一時格納
					$('#'+div_id).remove();											// 画面hidden情報を削除
					count_stuff++;
				}

				var temp_panel_name = '#'+ $.shop_search.config.event_container;
				var $temp_str = $(ret_str);
				$temp_str.animate({opacity: 0}, 1);
				setTimeout(function(){
					$temp_str.animate({opacity: 1}, 1000);
				},$temp_str.appendTo($(temp_panel_name)));


				// $.shop_search.config.total_count = response_data.length;

				// $.shop_search.config.total_count = 98;
				$.shop_search.config.total_page = Math.ceil($.shop_search.config.total_count / $.shop_search.config.event_limit);
				var pages = $.shop_search.pagination($.shop_search.config.current_page, $.shop_search.config.event_limit, $.shop_search.config.total_count);
				var prev = $.shop_search.config.current_page - 1;
				var next_page = parseInt($.shop_search.config.current_page) + 1;

				var pagination = $.shop_search.config.current_page == 1 ? '<li><button disabled><span class="icon-left"></span></button></li>' : '<li><button><span class="icon-left getRecords" page-id="' + prev + '"></span></button></li>';

				for (var i = 0; i <= pages.length; i++) {
					if (pages[i] !== undefined) {
						if (pages[i] == '...') {
							pagination += '<li>...</li>';
						} else {
							var current_class =  '';
							var paging_class =  '';
							if ($.shop_search.config.current_page == pages[i]) {
								pagination += '<li class="p-news__page_current"><a>' + pages[i] + '</a></li>';
							} else {
								paging_class = 'getRecords';
								pagination += '<li><a class="getRecords" page-id="' + pages[i] + '">' + pages[i] + '</a></li>';
							}
						}
					}
				}
				if ($.shop_search.config.total_page == $.shop_search.config.current_page) {
					pagination += '<li><button disabled><span class="icon-right"></span></button></li>';
				} else {
					pagination += '<li><button><span class="icon-right getRecords" page-id="' + next_page + '"></span></button></li>';
				}
				if($.shop_search.config.total_count==0){
					pagination = "";
				}
				$('.p-news__pagenation').html(pagination);
			}
			var $temp_str = $(ret_str);
			$temp_str.animate({opacity: 0}, 1);
			setTimeout(function(){
					$temp_str.animate({opacity: 1}, 1000); // fade
				},
				// 一時格納情報を画面に出す。表示する。
				$temp_str.appendTo($container));
		}

	}
	,pagination : function(currentPage, limit, totalItems) {
		currentPage = parseInt(currentPage);
		limit = parseInt(limit);
		totalItems = parseInt(totalItems);
		var totalItemsArray = [];
		var totalItemsSplitLimit = [];
		let range=[];
		let all=[];
		let finalArray = [];

		for (let i = 1; i <=totalItems; i += 1) {
			totalItemsArray.push(i);
		}
		for (let i = 0; i < totalItemsArray.length; i += limit) {
			chunk = totalItemsArray.slice(i, i + limit);
			totalItemsSplitLimit.push(chunk);
		}
		for(let i=1;i<=totalItemsSplitLimit.length; i+=1){
			range.push(i);
		}

		const chunkSize = 7;
		for (let i = 0; i < range.length; i += chunkSize) {
			chunk = range.slice(i, i + chunkSize);
			all.push(chunk);
		}
		for (let i = 0; i < all.length; i += 1) {

			let totalArrayLength = all.length;

			let firstArray = all[0];
			let currentArray = all[i];
			let currentArraylength = all[i].length;
			let lastArray = all[all.length-1];

			let lastArrayIndex = all.length-1;
			var lastArrayCount = all[all.length-1].length;
			var lastValue = all[all.length-1].slice(-1)[0];

			lastValue = parseInt(lastValue);

			let currenPageIndexFun = (element) => element == currentPage;
			let currenPageIndex = all[i].findIndex(currenPageIndexFun);

			let firstPageSet = [1,2,3,4,5,"...",lastValue];
			let currentPageSet = [1,"...",currentPage-1,currentPage,currentPage+1,"...",lastValue];
			let lastPageSet = [1,"...",lastValue-4,lastValue-3,lastValue-2,lastValue-1,lastValue];

			if(i==0 && firstArray.includes(currentPage)){
				if(totalArrayLength>1){
					if(currenPageIndex==0 ||currenPageIndex==1||currenPageIndex==2){
						finalArray = firstPageSet;
					}
					else if(currenPageIndex==5 || currenPageIndex==6){
						finalArray = currentPageSet;
						let nextArray = all[1];
						if((nextArray.length<3 && currenPageIndex==6) || nextArray.length<2){
							finalArray = lastPageSet;
						}
					}
					else{
						finalArray = currentPageSet;
					}
				}else{
					finalArray = firstArray;
				}
			}else if(i==lastArrayIndex && lastArray.includes(currentPage)){
				finalArray = lastPageSet;
				if(currentArraylength==7){
					if(currenPageIndex==0 || currenPageIndex==1 || currenPageIndex==2 || currenPageIndex==3){
						finalArray = currentPageSet;
					}
				}
				if(currentArraylength==6){
					if(currenPageIndex==0 || currenPageIndex==1 || currenPageIndex==2){
						finalArray = currentPageSet;
					}
				}
				if(currentArraylength==5){
					if(currenPageIndex==0 || currenPageIndex==1){
						finalArray = currentPageSet;
					}
				}
				if(currentArraylength==4){
					if(currenPageIndex==0){
						finalArray = currentPageSet;
					}
				}
			}else if(i!=0 && i!=lastArrayIndex && currentArray.includes(currentPage)){
				finalArray = currentPageSet;
				let nextArray = all[i+1];
				nextArrayCount = nextArray.length;
				if(nextArrayCount==2){
					if(currenPageIndex==6){
						finalArray = lastPageSet;
					}
				}
				if(nextArrayCount==1){
					if(currenPageIndex==5 || currenPageIndex==6){
						finalArray = lastPageSet;
					}
				}
			}

		}

		return finalArray;

	}
	// ダイニングカフェを取得する。
	,run_smp_dinning_cafe : function($container) {
		count_stuff = 0;
		//alert('実行');
		url = $.shop_search.getUrl();
		if(ajax_status_shop == 'standby'){
			ajax_status_shop = 'active';
			set_dining_cafe_done = 1;
			$.ajax({
				type: "GET",
				async: true,
				cache: false,
				url:url,
				// contentType: "application/json; charset=utf-8",
				//  data: continues,
				dataType: "json",
				success: function(response)
				{
					response_data = response[1];
					$.shop_search.set_smp_dinning_cafe($container, 0);
				},
				complete:function(){
					// ajax制御解除
					ajax_status_shop = 'standby';
					set_dining_cafe_done = 2;
				},
				cache: false,
				error: function(response)
				{
					ajax_status_shop = 'standby';
				}
			});

		}
		return null;
	}
	// ダイニングカフェをセットする。
	,set_smp_dinning_cafe : function($container, goodCategory, site_id) {
		var ret_str=''; // 初期化
		var shop_news_html = $('#dinning_cafe_loop_text').html();
		if(typeof response_data === "undefined" || response_data == null){

		}else{
			re = new RegExp(goodCategory, "i");

			for (key in response_data) {
				if(goodCategory == '0' || response_data[key].goods_category.match(re)){
					v = response_data[key];
					var duplicate_row_html = shop_news_html;
					var div_id = 'dinning_cafe_row_'+count_stuff;
					$(duplicate_row_html).appendTo($('#dinning_cafe_loop_temp'));		// 取り敢えず画面hiddenにセット
					$('#dinning_cafe_row','#dinning_cafe_loop_temp').attr('id', div_id);	// idを変換
					//$.shop_search.setDinning_cafe_row(div_id,response_data[key]);		// 情報をセットする。

					temp_building_info = $.shop_search.getBuildingSmpDinningClass(v.building_category);
					$('#dinning_cafe_place','#'+div_id).removeClass().addClass(temp_building_info.id);
					$('#dinning_cafe_place > img','#'+div_id).attr('src', temp_building_info.img)
						.attr('alt',v.building_category_name);
					temp_building_img_html = $('#dinning_cafe_place > img','#'+div_id);
					if(typeof site_id ==="undefined"|| site_id == null){
						$('#dinning_cafe_place','#'+div_id).text(v.building_category_name);
					}else if(site_id==2){
						print_place = (typeof v.place==='undefined' ||  v.place == null)?"":" "+v.place;
						print_floor = (typeof v.floor==='undefined' ||  v.floor == null)?"":" "+v.floor;

						$('#dinning_cafe_place','#'+div_id).text(v.building_category_name +""+ print_floor);
					}

					(temp_building_img_html).prependTo($('#dinning_cafe_place','#'+div_id));
					temp_dinning_place_html = $('#dinning_cafe_place','#'+div_id);

					$('#dinning_cafe_og_image > img','#'+div_id).attr('src',v.shop_img1);
					$('a', '#'+div_id).attr('href',v.site_url);
					$('#dinning_cafe_title','#'+div_id).text(v.name);

					$(temp_dinning_place_html).prependTo($('#dinning_cafe_title','#'+div_id));

					ret_str= ret_str.concat($('#dinning_cafe_loop_temp').html());		// ソースを一時格納
					$('#'+div_id).remove();											// 画面hidden情報を削除
					count_stuff++;
				}
			}
			var $temp_str = $(ret_str);
			$temp_str.animate({opacity: 0}, 1);
			setTimeout(function(){
					$temp_str.animate({opacity: 1}, 1000); // fade
				},
				// 一時格納情報を画面に出す。表示する。
				$temp_str.appendTo($container));
		}

	}
	,getbuilding_category_cafe_class :function(v){
		var return_class = "";
		if(v == 2){
			return_class = "tagApia";
		}else if(v == 3){
			return_class = "tagEsta";
		}else if(v == 4){
			return_class = "tagPaseo";
		}else if(v == 5){
			return_class = "tagStellar";
		}
		return return_class;
	}
	,getbuilding_category_class :function(v){
		var return_class = "";
		if(v == 2){
			return_class = "p-icon__apia";
		}else if(v == 3){
			return_class = "p-icon__jrtower";
		}else if(v == 5){
			return_class = "p-icon__stellar";
		}else if(v == 6){
			return_class = "p-icon__t38";
		}else if(v == 1){
			return_class = "p-icon__jrtower";
		}
		return return_class;
	}
	,getBuildingSmpDinningClass : function(v){
		var return_class = "";
		var img_url_icon_place = "/share/jr-tower/img/smp/";
		if(v == 2){
			return_class = {"id" : "detail_place_apia","img" : img_url_icon_place + "icon_place_apia.gif"};
		}else if(v == 3){
			return_class = {"id" : "detail_place_esta","img" : img_url_icon_place + "icon_place_esta.gif"};
		}else if(v == 4){
			return_class = {"id" : "detail_place_paceo","img" : img_url_icon_place + "icon_place_paceo.gif"};
		}else if(v == 5){
			return_class = {"id" : "detail_place_stela","img" : img_url_icon_place + "icon_place_stela.gif"};
		}else{

		}
		return return_class;
	}
	,isPreview : function(){
		var url = document.location.href;

		if(url.match(/preview/i)) {
			return 'preview.';
		}

		return "";
	}
};