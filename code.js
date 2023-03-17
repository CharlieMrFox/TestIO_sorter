// ==UserScript==
// @name         Sort table with Tampermonkey
// @version      1.0
// @description  Adds sortable class to table and allows sorting by clicking on table headers
// @author       Charlie
// @match        https://onboardingmanager.test.io/managers/onboarding_submissions*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
// Creates a search to find items on current page
    const table = document.getElementById('bugs_table');
table.insertAdjacentHTML('beforebegin', '<input type="text" id="search-input" placeholder="Search...">');

const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', function() {
  const searchTerm = searchInput.value.toLowerCase();

  const rows = Array.from(document.querySelectorAll('#bugs_table tbody tr'));

  const filteredRows = rows.filter(row => {
    const cells = Array.from(row.querySelectorAll('td'));
    return cells.some(cell => {
      return cell.textContent.toLowerCase().includes(searchTerm);
    });
  });

  rows.forEach(row => {
    row.style.display = 'none';
  });

  filteredRows.forEach(row => {
    row.style.display = '';
  });
});




    var d = document.getElementById("bugs_table");
    d.className += " sortable";

    function sortTable(columnIndex) {
      var table = document.getElementById("bugs_table");
      var rows = table.rows;
      var switching = true;

      // Remove the "sorted" class and arrow icon from all header cells
      var headerCells = table.getElementsByTagName("th");
      for (var i = 0; i < headerCells.length; i++) {
        headerCells[i].classList.remove("sorted");
        var arrowIcon = headerCells[i].querySelector(".arrow-icon");
        if (arrowIcon) {
          arrowIcon.parentNode.removeChild(arrowIcon);
        }
      }

      while (switching) {
        switching = false;

        for (var i = 1; i < rows.length - 1; i++) {
          var row1 = rows[i].getElementsByTagName("td")[columnIndex];
          var row2 = rows[i + 1].getElementsByTagName("td")[columnIndex];

          if (row1.innerHTML.toLowerCase() > row2.innerHTML.toLowerCase()) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
          }
        }
      }

      // Add the "sorted" class and arrow icon to the header cell of the sorted column
      var sortedHeader = headerCells[columnIndex];
      sortedHeader.classList.add("sorted");
      var arrowIcon = document.createElement("span");
      arrowIcon.classList.add("arrow-icon");
      if (switching) {
        arrowIcon.classList.add("up");
      } else {
        arrowIcon.classList.add("down");
      }
      sortedHeader.appendChild(arrowIcon);

      // Add the CSS for the "arrow-icon" class
      var css = `
        .arrow-icon {
          margin-left: 5px;
          display: inline-block;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 5px 5px 0 5px;
          border-color: #236a84 transparent transparent transparent;
        }
        .arrow-icon.up {
          border-width: 0 5px 5px 5px;
          border-color: transparent transparent #333333 transparent;
        }
        .arrow-icon.down {
          border-width: 5px 5px 0 5px;
          border-color: #236a84 transparent transparent transparent;
        }
      `;
      var style = document.createElement("style");
      style.appendChild(document.createTextNode(css));
      document.head.appendChild(style);
    }

    var ths = document.getElementsByTagName("th");

    for (var i = 0; i < ths.length; i++) {
      ths[i].addEventListener("click", function() {
        var columnIndex = this.cellIndex;
        sortTable(columnIndex);
      });
    }
})();
