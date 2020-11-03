//= require bootstrap-datepicker
import { Controller } from "stimulus"
import rangePlugin from 'flatpickr/dist/plugins/rangePlugin';

export default class extends Controller {
  static targets = []

  connect() {
    this.collapseInputs();
    window.addEventListener('resize', this.collapseInputs);
    $(document).ready(function () {
      Inputmask().mask(document.querySelectorAll("input"));
    });
    this.loadFlatpickr();
    this.loadMultipleSelect();
  }

  loadMultipleSelect() {
    $('#query_status').multipleSelect({
      animate: "slide",
      formatSelectAll: () => { return "Select All" },
      onOpen: () => {
        document.querySelector('.ms-choice').classList.add('active');
      },
      onClose: () => {
        document.querySelector('.ms-choice').classList.remove('active');
      },
      width: "auto",
      // onAfterCreate: () => {
      //   document.querySelector('.ms-choice').tabIndex = 0;
      // }
    })
    $('#query_status').multipleSelect('checkAll')
  }

  loadFlatpickr() {
    flatpickr(".datepicker", {
      dateFormat: "d/m/Y",
      wrap: true,
      maxDate: new Date(),
      "plugins": [new rangePlugin({ input: "#date_end" })],
    })
  }

  handleEnter(e) {
    e.currentTarget.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {
        event.currentTarget.click();
      }
    })
  }

  collapseInputs() {
    const input_status = document.getElementById('multiCollapse1');
    const input_date = document.getElementById('multiCollapse2');
    if (window.innerWidth < 1200) {
      input_status.classList.remove('show');
      input_date.classList.remove('show');
    } else {
      input_status.classList.add('show');
      input_date.classList.add('show');
    }
  }
}
