$(document).ready(function() {
	$.ajax({
		url: 'https://62b91ad341bf319d22761d85.mockapi.io/api/v1/objects/articles',
		type: "GET",
		success: function (result) {
			console.log(result)
		},
		error: function(err) {
			console.log(err);
		}
	})
})
