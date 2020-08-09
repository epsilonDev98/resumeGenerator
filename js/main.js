document.querySelector('#page').contentEditable = true;

defaultTemplateVars = ["fontDroid", "caseNormal", "titleRuled", "ruleAbove", "imageShow", "rollShow", "course1", "tableShow", "edyearFirst", "experience1", "projects1"]

$('.toggle-option').click(function() {
  toggleType = $(this).attr('data-toggle');
  toggleValue = $(this).attr('id');
  if (!$(this).hasClass('multi-select')) {
    if (!$(this).hasClass('selected')) {
      $('.toggle-option', $(this).parent()).removeClass('selected');
      $(this).addClass('selected');
      changeTemplate(toggleType, toggleValue);
    }
  } else {
    if ($(this).hasClass('selected'))
      $(this).removeClass('selected');
    else
      $(this).addClass('selected');
    changeTemplate(toggleType, toggleValue);
  }
});

$('input[name="sectionToggle"]').change(function() {
  toggleSection($(this).val(), $(this).is(':checked'));
});


function template(value) {
  if (value == 'default') {
    $('#defaultTemplateBtn').removeClass('btn-default').addClass('btn-danger');
    $('#customTemplateBtn').removeClass('btn-danger').addClass('btn-default');
    $('#customTemplateOptions').hide();
    for (i = 0; i < defaultTemplateVars.length; i++)
      $('#' + defaultTemplateVars[i]).click();
  } else {
    $('#customTemplateBtn').removeClass('btn-default').addClass('btn-danger');
    $('#defaultTemplateBtn').removeClass('btn-danger').addClass('btn-default');
    $('#customTemplateOptions').show();
  }
}

function toggleSection(sectionName, toggleState) {
  if (toggleState == true)
    $('input[value="' + sectionName + '"]').attr('checked', 'true');
  else
    $('input[value="' + sectionName + '"]').removeAttr('checked');
  $('#' + sectionName).toggle();
}

function changeTemplate(toggleType, toggleValue) {
  switch (toggleType) {
    case 'margin':
      if (toggleValue == 'margin1')
        $('#page').css('padding', '0.2cm 1cm 1cm 1cm');
      else if (toggleValue == 'margin2')
        $('#page').css('padding', '0.2cm 1.1cm 1cm 1.1cm');
      else if (toggleValue == 'margin3')
        $('#page').css('padding', '0.2cm 1.2cm 1cm 1.2cm');
      else if (toggleValue == 'margin4')
        $('#page').css('padding', '0.2cm 1.3cm 1cm 1.3cm');
      else if (toggleValue == 'margin5')
        $('#page').css('padding', '0.2cm 1.4cm 1cm 1.4cm');
      else if (toggleValue == 'margin6')
        $('#page').css('padding', '0.2cm 1.5cm 1cm 1.5cm');
      break;
    case 'line':
      if (toggleValue == 'line1')
        $('#page').css('line-height', '1.1em');
      else if (toggleValue == 'line2')
        $('#page').css('line-height', '1.2em');
      else if (toggleValue == 'line3')
        $('#page').css('line-height', '1.3em');
      else if (toggleValue == 'line4')
        $('#page').css('line-height', '1.4em');
      else if (toggleValue == 'line5')
        $('#page').css('line-height', '1.5em');
      else if (toggleValue == 'line6')
        $('#page').css('line-height', '1.6em');
      break;
    case 'column':
      if (toggleValue == 'column1')
        $('.table tbody tr td:nth-child(1)').toggleClass('text-center');
      else if (toggleValue == 'column2')
        $('.table tbody tr td:nth-child(2)').toggleClass('text-center');
      else if (toggleValue == 'column3')
        $('.table tbody tr td:nth-child(3)').toggleClass('text-center');
      else if (toggleValue == 'column4')
        $('.table tbody tr td:nth-child(4)').toggleClass('text-center');
      break;

    case 'font':
       if (toggleValue == 'fontNewTimesRoman')
        $('#page').removeClass('droid').removeClass('roboto').removeClass('verdana-serif').addClass('new-times-roman');

      else if (toggleValue == 'fontDroid')
        $('#page').removeClass('roboto').removeClass('verdana-serif').removeClass('verdana-sans').addClass('droid');
      break;
    case 'title':
      if (toggleValue == 'titleRuled') {
        $('.section-title').removeClass('shaded');
        $('.section-title').addClass('ruled');
      } else {
        $('.section-title').removeClass('ruled');
        $('.section-title').addClass('shaded');
      }
      break;
    case 'table':
      if (toggleValue == 'tableShow') {
        $('#educationTable').removeClass('borderless');
        $('#educationTable').addClass('customBordered');
      } else {
        $('#educationTable').removeClass('customBordered');
        $('#educationTable').addClass('borderless');
      }
      break;
    case 'edyear':
      if (toggleValue == 'edyearFirst') {
        $("#educationTable tr").each(function() {
          $(this).find("td").eq(0).before($(this).find("td").eq(3));
        });
        var temp = document.getElementById('column4').className;
        document.getElementById('column4').className = document.getElementById('column3').className;
        document.getElementById('column3').className = document.getElementById('column2').className;
        document.getElementById('column2').className = document.getElementById('column1').className;
        document.getElementById('column1').className = temp;
      } else {
        $("#educationTable tr").each(function() {
          $(this).find("td").eq(3).after($(this).find("td").eq(0));
        });
        var temp = document.getElementById('column1').className;
        document.getElementById('column1').className = document.getElementById('column2').className;
        document.getElementById('column2').className = document.getElementById('column3').className;
        document.getElementById('column3').className = document.getElementById('column4').className;
        document.getElementById('column4').className = temp;
      }
      break;
  }
}
function decreaseIndent() {
  node = getSelectionContainerElement();
  while (node.tagName != 'UL')
    node = node.parentNode;
  node.style.paddingLeft = parseInt(window.getComputedStyle(node).getPropertyValue("padding-left")) - 5;
}

function increaseIndent() {
  node = getSelectionContainerElement();
  while (node.tagName != 'UL')
    node = node.parentNode;
  node.style.paddingLeft = parseInt(window.getComputedStyle(node).getPropertyValue("padding-left")) + 5;
}

function changeListStyle(value) {
  node = getSelectionContainerElement();
  while (node.tagName != 'UL')
    node = node.parentNode;
  node.className = value;

}


function getSelectionContainerElement() {
  var range, sel, container;
  if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    return range.parentElement();
  } else if (window.getSelection) {
    sel = window.getSelection();
    if (sel.getRangeAt) {
      if (sel.rangeCount > 0)
        range = sel.getRangeAt(0);
    } else {
      // Old WebKit selection object has no getRangeAt, so
      // create a range from other selection properties
      range = document.createRange();
      range.setStart(sel.anchorNode, sel.anchorOffset);
      range.setEnd(sel.focusNode, sel.focusOffset);
      // Handle the case when the selection was selected backwards (from the end to the start in the document)
      if (range.collapsed !== sel.isCollapsed) {
        range.setStart(sel.focusNode, sel.focusOffset);
        range.setEnd(sel.anchorNode, sel.anchorOffset);
      }
    }
    if (range) {
      container = range.commonAncestorContainer;
      // Check if the container is a text node and return its parent if so
      return container.nodeType === 3 ? container.parentNode : container;
    }
  }
}

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
