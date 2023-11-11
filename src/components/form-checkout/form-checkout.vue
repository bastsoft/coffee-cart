<template>
<div class="form-checkout">
  <form v-if="!formModel.step" @submit.prevent="submit">
  <p>We will send you a payment link via email.</p>
  <div class="row">
    <label for="name">Name</label>
    <input ref="name" type="text" name="name" id="name" v-model="formModel.name" autocomplete="off" required>
  </div>
  <div class="row">
    <label for="email">Email</label>
    <input type="email" name="email" id="email" v-model="formModel.email" autocomplete="off" required>
  </div>
  <div class="row" aria-label="Promotion agreement">
    <input type="checkbox" name="promotion" v-model="formModel.subscribe" id="promotion" aria-label="Promotion checkbox">
    <label id="promotion-label" for="promotion" aria-label="Promotion message">I would like to receive order updates and promotional messages.</label>
  </div>
  <div class="row" aria-label="need to deliver">
    <input type="checkbox" name="needToDeliver" v-model="formModel.isNeedToDeliver" id="needToDeliver" aria-label="need to deliver checkbox">
    <label id="needToDeliver-label" for="needToDeliver" aria-label="need to deliver message">need to deliver</label>
  </div>
  <div class="row-btn">
    <button type="submit">{{formModel.isNeedToDeliver ? "Next" : "Submit"}}</button>
  </div>
</form>

<form v-if="formModel.step === 1"  @submit.prevent="submit">
  <label class="row">
    <span>Date</span>
    <input name="date" data-testid="date" type="date" v-model="formModel.day" required/>
  </label>
  <label class="row">
    <span>Time:</span>
    <select name="time"  data-testid="time" v-model="formModel.time" required>
      <option disabled value="">Choose</option>
      <option>10:00 - 14:00</option>
      <option>14:00 - 17:00</option>
      <option>17:00 - 21:00</option>
    </select>
  </label>
  <label class="row">
    <span>Address:</span>
    <input list="address"  data-testid="address" name="address" autocomplete="off" v-model="formModel.address"  required/>
  </label>

  <div class="row">
    <input type="radio" data-testid="typePayCard" name="typePay" value="card"  v-model="formModel.typePay" required>
    <label for="cardToCourier">Card</label>
    <input type="radio" data-testid="typePayCash" name="typePay" value="cash" v-model="formModel.typePay">
    <label for="cashToCourier">Cash</label>
  </div>

  <div class="row-btn">
    <button type="submit">Submit</button>
  </div>
</form>
</div>
</template>

<script>

export default {
  props: {
    modelValue: {
      type: Object,
      default: ()=>({
        name: '',
        email: '',
        subscribe: false,

        day: null,
        time: null,
        address: null,
        typePay: null,

        step:0,
        isNeedToDeliver: false,
      }),
    }
  },

  computed: {
    formModel: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    }
  },
  methods: {
    submit() {
      const {isNeedToDeliver, step, email, typePay} = this.formModel;
      const isRequiredFirstStep = !isNeedToDeliver && email;
      const isRequiredTwoStep = isNeedToDeliver && typePay;
      const isNext = isNeedToDeliver && step === 0;

      if(isNext){
        this.formModel.step += 1;
        return;
      }
      
      if(isRequiredFirstStep || isRequiredTwoStep) {
        this.$emit("submitForm");
      }
    }
  }
}
</script>

<style>
.form-checkout label {
  margin-inline-end: 10px;
  padding-block: 10px;
}

.form-checkout input[type="checkbox"] {
  margin-inline-end: 10px;
}

.form-checkout input, form select {
  padding-block: 4px;
  padding-inline: 10px;
}

.form-checkout .row {
  display: block;
  padding-block: 10px;
}

.form-checkout .row-btn {
  display: flex;
  justify-content: flex-end;
}

.form-checkout button {
  border: 4px solid black;
  background: antiquewhite;
  margin: 0 6px;
  font-size: x-large;
}

.form-checkout button:hover {
  border-color: goldenrod;
  color: goldenrod;
}

.form-checkout label span {
  display: inline-block;
  width: 65px;
}
</style>