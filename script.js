$(document).ready(function() {
	$.ajax({
		// call API
		url: 'https://62b91ad341bf319d22761d85.mockapi.io/api/v1/objects/articles',
		type: "GET",
		success: function (result) {
			// countBy to count how many times per category.
			let categoryCount = _.countBy(result, 'category');

			console.log(categoryCount);

			var html = "<table><tbody><th>Category</th><th>No. of articles</th>";

			_.forEach(categoryCount, function(value,category) {
				html += "<tr><td>" + category + "</td><td>" + value + "</td></tr>";
			});

			html += "</tbody></table>";

			$("#table1").html(html);

			// filter odd IDs
			let odd = _.filter(result, article => article.id % 2 === 1);

			let filteredCat =
				_.chain(odd)
				// Group the elements of Array based on `category` property
				.groupBy("category")
				// `key` is group's name (category), `value` is the array of objects (articles)
				.map((value, key) => ({ category: key, articles: value }))
				.value();

				for(i=0; i<filteredCat.length; i++) {
					console.log(filteredCat[i])
				};
		},
		error: function(err) {
			console.log(err);
		}
	})
})
