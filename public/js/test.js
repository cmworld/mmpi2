$(document).ready(function(){
	function setOwner(owner)
	{
		$('#owner span[data-bind="label"]').text(owner=='all'?'Tutti i test':'I miei test');
	  	if(owner == 'all'){
		  	$('li:Has(#all)').attr('class','disabled');$('li:Has(#user)').removeAttr('class');
	  	} else {
	  		$('li:Has(#user)').attr('class','disabled');$('li:Has(#all)').removeAttr('class');
	  	}
	}

	setOwner("{{ session('owner') }}");

    $(document.body).on('click', '#menu_test li', function(event) {  
	  setOwner(event.target.id);
	  test.getList();
    });
    
    $(document).ready(function(event) {
	  if($('#testtable thead a.sort span[class!="fa fa-sort"]').attr('id')===undefined){
	  	test.changeIcons('id', 'asc');
	  }
    });

	$(document.body).on( 'click', '#search', function( event ) {
		$('#txtSearch').focus();
    });

	$(document.body).on( 'keyup', '#txtSearch', function( event ) {
	 	if(event.which==13){
 			event.preventDefault();
		} else {
			test.getList();
	  	}
    });

    $(document.body).on('click', '.pagination a', function(e) {
        e.preventDefault();

        var url = $(this).attr('href');
        test.getList(url);
    });

    $(document.body).on('click', '#testtable thead a.sort', function(e) {
        e.preventDefault();
        
        var span = $(e.target).find('span');
        var dir = span.attr("class").includes('asc') ? 'desc' : 'asc';
        span.removeAttr("class").addClass("fa fa-sort-"+dir);

        test.getList(null, e.target.id);
    });
 });