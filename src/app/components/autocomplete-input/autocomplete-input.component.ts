import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';


import { HostListener } from '@angular/core';
import { KeyboardKeys } from '../../keyboard-helper/keyboard-keys';
import { KeyMapper } from '../../keyboard-helper/keyboard-key-mapper';

import { Countries } from '../../data/test-data'; /* Only for test data */

@Component({
  selector: 'app-root', // change me!
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss']
})
export class AutoCompleteInputComponent implements OnInit {
 @Input('options') options: string[];
  optionsFiltered: string[];

  @Input('optionsLimit') optionsLimit: number; // Set limit to autocomplete options displayed
  optionIndex: number = 0; // changes active item in autocomplete options
  originInput: boolean = true; // determines if activeOptionIndex remains at zero

  searchForm: FormGroup;
  searchInput: FormControl = new FormControl();

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {

    this.options = Countries;
    this.optionsLimit = 5;

    this.searchForm = this._formBuilder.group({
      searchInput: this.searchInput
    });

    this.searchForm.valueChanges.subscribe(value => {
      this.searchInitiated(); // initates search
    });
  }

  // Initiate search when form changes
  searchInitiated() {
    // Always clear the list!
    this.optionsFiltered = null;

    // Clear autocomplete options on empty search
    if (!this.searchInput.value) {
      this.optionIndex = 0;
      return;
    }

    // Filter autocomplete options
    this.optionsFiltered =
      this.options.filter(option => option.toLowerCase().substr(0, this.searchForm.get('searchInput').value.length) === this.searchForm.get('searchInput').value.toLowerCase());
  }

  // Listen for keyboard event - Filter auto complete options list 
  @HostListener('window:keydown', ['$event'])
  findInAutoCompleteOptions(event: KeyboardEvent) {
    // Call helper class to map keyboard key
    let direction = KeyMapper.MapKeyBoardKey(event);
    if (direction === KeyboardKeys.KeyNotMapped) { this.optionIndex = 0; return; } // Return if key is not mapped

    // Return if empty
    if (!this.optionsFiltered) {
      return;
    }

    // keep a copy of the autocomplete option by index before amending the activeOptionIndex
    let autoSearch = this.optionsFiltered[this.optionIndex];

    // increment depnending on direction
    if (direction === KeyboardKeys.Down) {
      // dont increment if directly from input
      if (this.originInput) {
        this.originInput = false;
        return;
      }
      // check index and loop to beginning of list if needed.
      if (this.optionIndex === (this.optionsLimit - 1) || this.optionIndex === (this.optionsFiltered.length - 1)) {
        this.optionIndex = 0;
        return;
      }
      this.optionIndex++; // increment to nav down

    } else if (direction === KeyboardKeys.Up) {
      event.preventDefault(); // stops the cursor from moving
      this.optionIndex != -1 ? this.optionIndex -- : -1;
      console.info(this.optionIndex);
      //       if (this.optionIndex != -1) {
      //   this.optionIndex--;
      // }
    } else if (direction === KeyboardKeys.Enter) {
      this.optionSelected(autoSearch);
    }
  }

  // Auto Complete option has been selected
  optionSelected(option: string) {
    this.searchForm.setValue({ searchInput: option }); // set control value
    this.optionsFiltered = null;
    this.originInput = true;
  }

  // Search form submitted
  searchSelected() {
    console.log(this.searchForm.get('searchInput').value);
    console.info(this.searchForm);
    return;
  }

}
