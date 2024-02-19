document.addEventListener("DOMContentLoaded", function() {
  // Define jQuery selectors for the elements
  var $navbarToggler = $('.navbar-toggler');
  var $closeToggler = $('.close-icon-container button');
  var $menu = $('#navbarSupportedContent');

  // Function to explicitly open or close the menu
  function openMenu() {
    $menu.addClass('show-menu');
  }

  function closeMenu() {
    $menu.removeClass('show-menu');
  }

  // Handle click on the close toggler
  $closeToggler.click(function(event) {
    event.stopPropagation();
    closeMenu();
  });
  // Toggle the menu when the navbar toggler is clicked
  $navbarToggler.click(function(event) {
    event.stopPropagation(); // Prevent the click from being propagated to the document

    if ($menu.hasClass('show-menu')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close the menu when clicking outside of it
  $(document).click(function(event) {
    // Check if the target of the click is not the menu or navbar toggler
    if (!$menu.is(event.target) && !$menu.has(event.target).length && !$navbarToggler.is(event.target) && !$navbarToggler.has(event.target).length) {
      closeMenu();
    }
  });

  $('.img-container').each(function() {
    var imgSrc = $(this).attr('data-src');
    if (imgSrc) {
      $(this).css('background-image', 'url(' + imgSrc + ')');
    }
  });

  $('td').each(function() {
    var imgSrc = $(this).attr('data-src');
    if (imgSrc) {
      $(this).css('background', 'url(' + imgSrc + ')');
    }
  });

  $('.language-dropdown').on('mouseover', function() {
    $(this).find('.dropdown-menu').show();
  }).on('mouseleave', function() {
    $(this).find('.dropdown-menu').hide();
  })

  $('.language-dropdown .dropdown-menu .dropdown-item').on('click', function() {
    const value = $(this).data('value');
    const src = $(this).find('img').attr('src');
    $(this).closest('.dropdown-menu').hide();
    $('.selected-language').text(value);
    $('.btn-language img').attr('src', src);
    $(this).closest('.dropdown-menu').find('.dropdown-item').removeClass('active');
    $(this).addClass('active');
  });

  $('main .tab-container .tab-item').on('click', function(e) {
    e.preventDefault();
    $(this).closest('.tab-main-container').find('.tab-item').removeClass('active')
    $(this).addClass('active')
  });

  $('.deposit-tab .payment-option-container button.btn-block').on('click', function() {
    $('.deposit-tab .payment-option-container button.btn-block').removeClass('active');
    $(this).addClass('active')
  })

  $('.search-container .dropdown-menu li').on('click', function(e) {
    e.preventDefault();
    const value = $(this).find('a').data('value');
    $(this).closest('.dropdown').find('.dropdown-toggle').text(`${value}`)
  })

  $('.country-code-container .dropdown-menu li').on('click', function(e) {
    e.preventDefault();
    const value = $(this).find('a').data('value');
    $(this).closest('.dropdown').find('.dropdown-toggle').text(`${value}`)
  })

  $('.home-thumbnail-container .image-container').each(function() {
    // Get the value of the 'data-src' attribute
    var src = $(this).data('src');
    // Set the background image using the 'data-src' value
    $(this).css('background-image', 'url(' + src + ')');
  });

  $('.nav-tabs .nav-link').on('blur', function() {
    $(this).css({
     " border-top-color": "transparent"
    })
  })


  const uls = document.querySelectorAll(".tabbar ul");

  uls.forEach((ul) => {
    const resetClass = ul.parentNode.getAttribute("class");
    const lis = ul.querySelectorAll("div");

    lis.forEach((li) => {
      li.addEventListener("click", (e) => {
        // e.preventDefault();
        // e.stopPropagation();
        const target = e.currentTarget;

        if (
          target.classList.contains("active") ||
          target.classList.contains("follow")
        ) {
          return;
        }

        ul.parentNode.setAttribute(
          "class",
          `${resetClass} ${target.getAttribute("data-where")}-style`
        );

        lis.forEach((item) => clearClass(item, "active"));

        setClass(target, "active");
      });
    });
  });

  function clearClass(node, className) {
    node.classList.remove(className);
  }

  function setClass(node, className) {
    node.classList.add(className);
  }

  $('.banner-wrapper').each(function() {
    const src = $(this).data('src');
    $(this).css({
      'background': `url('${src}')`,
    })
  });


  // Function to generate a random row - adjust contents as per your requirement
  function generateRandomRow() {
    // Example of generating a random game name and setting static values for other columns
    var games = ["Divine Megaways", "Fruit Millions", "Volcano Rising", "Sweet Bonanza", "Crazy Time", "Truck Driver", "Crash and Fruits", "Dolphin Mania"];
    var randomGameIndex = Math.floor(Math.random() * games.length);
    var randomGame = games[randomGameIndex];
    var playerId = "Player" + Math.floor(Math.random() * 9999);
    var betAmount = (Math.random() * 100 + 10).toFixed(2) + " $";
    var multiplier = (Math.random() * 5 + 1).toFixed(1) + " x";
    var profitAmount = (parseFloat(betAmount) * parseFloat(multiplier)).toFixed(2) + " $";
    var randomNumber = Math.floor(Math.random() * 9) + 1;

    return `<tr>
      <td>
        <div class="table-img-container">
          <img src="assets/assets/thumbnails/slots/NLC000${randomNumber}.png" class="img-fluid">
          <p>${randomGame}</p>
        </div>
      </td>
      <td>${playerId}</td>
      <td class="mobile-md">${betAmount}</td>
      <td class="mobile-md">${multiplier}</td>
      <td class="text-right"><span class="profit">${profitAmount}</span></td>
    </tr>`;
  }

  // Function to add a row and remove the first row with animation
  function addRowAndRemoveFirst() {
    var newRow = generateRandomRow();
    var $newRow = $(newRow).hide(); // Hide the new row initially

    // Append the new row to the table body
    $("#latest-tab-pane .table tbody").append($newRow);

    // Slide down or fade in the new row for a smooth appearance

    // Animate and remove the first row
    $("#latest-tab-pane .table tbody tr:first").slideUp(300, function() {
      $(this).remove();
      $newRow.fadeIn(1000); // You can also use slideDown() if you prefer
    });
  }

  // Example: Add and remove row every 5 seconds
  setInterval(addRowAndRemoveFirst, 5000);
});