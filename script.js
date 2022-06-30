$(document).ready(function() {
	$.ajax({
		// call API
		url: 'https://62b91ad341bf319d22761d85.mockapi.io/api/v1/objects/articles',
		type: "GET",
		success: function (result) {
			// countBy to count how many times per category.
			let categoryCount = _.countBy(result, 'category');

			console.log(categoryCount);

			var table1 = "<table><tbody><th>Category</th><th>No. of articles</th>";

			_.forEach(categoryCount, function(value,category) {
				table1 += "<tr><td>" + category + "</td><td>" + value + "</td></tr>";
			});

			table1 += "</tbody></table>";

			$("#table1").html(table1);

			// filter odd IDs
			let odd = _.filter(result, article => article.id % 2 === 1);

			let filteredCat =
				_.chain(odd)
				// Group the elements of Array based on `category` property
				.groupBy("category")
				// `key` is group's name (category), `value` is the array of objects (articles)
				.map((value, key) => ({ category: key, articles: value }))
				.value();

			var table2 = "<table><tbody><th>Category</th><th>Articles</th>"

			for(i=0; i<filteredCat.length; i++) {
				table2 += "<tr><td>" + filteredCat[i].category + "</td><td>";
				for(j=0; j<filteredCat[i].articles.length; j++) {
					// _.pick to only get values from id, title and author from each article
					var articles = _.pick(filteredCat[i].articles[j], ['id','title', 'author']);
					table2 += "<p>"
					_.forEach(articles, function(articleInfo, key) {
						table2 += "<span class='key'>" + key  + "</span>: " + articleInfo + "<br>";
					});
				};
			};

			table2 += "</p></td></tbody></table>";

			$("#table2").html(table2);
		},
		error: function(err) {
			console.log(err);
		}
	})
})
