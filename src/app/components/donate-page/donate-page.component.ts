import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AngularStripeService } from '@fireflysemantics/angular-stripe-service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-donate-page',
  templateUrl: './donate-page.component.html',
  styleUrls: ['./donate-page.component.scss']
})
export class DonatePageComponent implements OnInit, AfterViewInit {

  @ViewChild('cardInfo', { static: false }) cardInfo: ElementRef;
  stripe;
  loading = false;
  confirmation;

  card: any;
  error: string;
  cardHandler(event) {
    // Disable the Pay button if there are no card details in the Element
    document.querySelector("button").disabled = event.empty;
    document.querySelector("#card-errors").textContent = event.error ? event.error.message : "";
  }

  constructor(
    private cd: ChangeDetectorRef,
    private stripeService:AngularStripeService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.stripeService.setPublishableKey('pk_test_51HJoEVDelqHvhi9OaaXHt66SqZ38eQC9R3vYe653Lb3FrKuva2GvE8I9RgKOvDDnb04GEXX7mbgvkT6zJCsuXEUd008Zoq68VA').then(stripe => {
      this.stripe = stripe;
      const elements = stripe.elements();
      this.card = elements.create('card');
      this.card.mount(this.cardInfo.nativeElement);
      this.card.addEventListener('change', this.cardHandler);
    })
  }

  async onSubmit(form: NgForm) {
    const { token, error } = await this.stripe.createToken(this.card);

    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Success!', token);
    }
  }

}
