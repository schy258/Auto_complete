let newArr = [];
    axios.get('https://pai-dev.bangalore2.com/api/get_parent_categories/').then(
        (response) => {
            var result = response.data;
            console.log(result);
            result.map(item => {
                newArr.push({name:item.name,image:item.icon})
            })
            console.log(newArr)
            var states = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local: [...newArr]
            });
          
            states.initialize();
            $('#the-basics .typeahead').typeahead({
                hint: true,
                highlight: true,
                minLength: 1,
              },
              {
                name: 'states',
                display: 'name',
                source: states.ttAdapter(),
                templates: {
                  empty: [
                    '<div class="empty-message">',
                      'No Record Found !',
                    '</div>'
                  ].join('\n'),
                  suggestion: function (data) {
                      return `<div class="man-section"><div class="image-section"><img src='${data.image ? data.image : "https://media.istockphoto.com/vectors/no-image-available-icon-vector-id1216251206?b=1&k=20&m=1216251206&s=170667a&w=0&h=z0hxu_BaI_tuMjMneE_APbnx_-R2KGPXgDjdwLw5W7o="}' style="height:50px;width:50px;margin-right:10px;"/></div><div class="description-section"><h1 style="margin-top:3px">${data.name}</h1><div class="more-section"></div></div><div style="clear:both;"></div></div>`;
                  }
                },
              });
        },
        (error) => {
            console.log(error);
        }
    );

