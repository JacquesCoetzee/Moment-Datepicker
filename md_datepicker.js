
function moment_datepicker(year, month, day, operator, datetype){

	// declaring all variables used
	var newYear, newMonth, newDay, momentDate, newDate;
	// adds or subtract dates depending on user input
	if(operator == 'plus'){
		momentDate = moment(year+'-'+month+'-'+day, 'YYYY-MM-DD').add(1, datetype);
	}
	if(operator == 'minus'){
		momentDate = moment(year+'-'+month+'-'+day, 'YYYY-MM-DD').subtract(1, datetype);
	}

	// split date 
	newYear = momentDate.format('YYYY');
	newMonth = momentDate.format('MM');
	newDay = momentDate.format('DD');

	// moment changes year, if year increment reach end or beginning.
	// the following rectifies that 'problem'
	if(datetype == 'months' && newYear != year){
		if(operator == 'plus'){
			newDate = moment(newYear+'-'+newMonth+'-'+newDay, 'YYYY-MM-DD').subtract(1, 'years');
			newYear = newDate.format('YYYY');
		}
		if(operator == 'minus'){
			newDate = moment(newYear+'-'+newMonth+'-'+newDay, 'YYYY-MM-DD').add(1, 'years');
			newYear = newDate.format('YYYY');
		}
	}
	// moment changes month, if month increment reach end or beginning.
	// the following rectifies that 'problem'
	if(datetype == 'days' && newMonth != month){
		if(operator == 'plus'){
			newDate = moment(newYear+'-'+newMonth+'-'+newDay, 'YYYY-MM-DD').subtract(1, 'months');
			newMonth = newDate.format('MM');
		}
		if(operator == 'minus'){
			newDate = moment(newYear+'-'+newMonth+'-'+newDay, 'YYYY-MM-DD').add(1, 'months');
			newMonth = newDate.format('MM');
			newDay = newDate.format('DD');
		}
	}
	// returns object with new dates
	return {year:newYear, month: newMonth, day: newDay};
}

$(function(){

	var md_date = $("#md-date");
	var md_year = $('input[name="md-year"]');
	var md_month = $('input[name="md-month"]');
	var md_day = $('input[name="md-day"]');

	md_date.val(moment().format('YYYY-MM-DD'));
	md_year.val(moment().format('YYYY'));
	md_month.val(moment().format('MM'));
	md_day.val(moment().format('DD'));

	$(".md-increment").click(function(){

		// declaring all variables used
		var year, month, day, operator, datetype;

		// assigning variables according to user input
		year = md_year.val();
		month = md_month.val();
		day = md_day.val();
		operator = $(this).data('operator');
		datetype = $(this).data('datetype');

		var d = moment_datepicker(year, month, day, operator, datetype);

		// change date inputs to new date
		md_year.val(d.year);
		md_month.val(d.month);
		md_day.val(d.day);
		md_date.val(d.year+'-'+d.month+'-'+d.day);
	});
});