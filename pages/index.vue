<template lang="pug">
section.hero.is-facon.is-bold.is-fullheight
  .hero-body
    .container
      .column.is-6.is-offset-3
        h1.title.has-text-centered
          img(src="/facon-long-white.svg" width="600" alt="FACON - Faculdade de Conchas")
        .box
          .title.has-text-black.has-text-centered
            span Inscreva-se&nbsp;
          .subtitle.has-text-black
            span E, após isso, um consultor entrará em contato contigo em até 48h.
          article.notification.is-danger(v-if="error")
            .media
              .media-left
                span.icon.is-large
                  i.fa.fa-times-circle.fa-3x
              .media-content
                | Eita, aconteceu algum problema!&nbsp;
                | &nbsp;Procure-nos no&nbsp;
                a(href="https://fb.com/idepead") Facebook
                | &nbsp;enquanto isso.
          article.notification.is-success(v-if="sended")
            .media
              .media-left
                span.icon.is-large
                  i.fa.fa-check-circle.fa-3x
              .media-content Inscrição realizada com sucesso! Dentro de 48h úteis entraremos em contato contigo.
          form(name="subscription", netlify, action="/send", method='POST', netlify-honeypot='subject', @submit.prevent="validateBeforeSubmit", novalidate="novalidate")
            .field(style="display:none;")
              .control
                input.input(type="text" name="subject")
            .field
              .control.has-icons-left(:class="{'is-loading': loading }")
                input.input(type="text" :class="{ 'is-danger': errors.has('cpf') }" name="cpf" v-model="form.cpf" placeholder="Qual seu CPF?"  v-validate="'required|cpf'" v-mask="['###.###.###-##']" required)
                span.icon.is-left
                  i.fa.fa-drivers-license-o
                span.help.is-danger(v-if="errors.has('cpf')") Informe seu CPF corretamente.
            .field
              .control.has-icons-left(:class="{'is-loading': loading }")
                input.input(type="text" :class="{ 'is-danger': errors.has('name') }" name="name" v-model="form.name" placeholder="Qual seu nome completo?"  v-validate="'required'" required)
                span.icon.is-left
                  i.fa.fa-user
                span.help.is-danger(v-if="errors.has('name')") Informe seu nome corretamente.
            .field
              .control.has-icons-left(:class="{'is-loading': loading }")
                input.input(type="phone" :class="{ 'is-danger': errors.has('phone') }" name="phone" v-model="form.phone" placeholder="Qual seu número telefone?" v-mask="['(##) ####-####', '(##) #####-####']" v-validate="'required|min:14|max:15'")
                span.icon.is-left
                  i.fa.fa-mobile
                span.help.is-danger(v-if="errors.has('phone')") Informe seu número telefônico corretamente.
            .field
              .control.has-icons-left(:class="{'is-loading': loading }")
                input.input(type="email" :class="{ 'is-danger': errors.has('email') }" name="email" v-model="form.email" placeholder="Qual seu e-mail?" v-validate="'required|email'")
                span.icon.is-small.is-left
                  i.fa.fa-envelope
                span.help.is-danger(v-if="errors.has('email')") Informe seu e-mail.
            .field
              .label Qual curso você tem interesse?
              article.notification.is-warning(v-if="noCourseSelected && this.form.courses.length === 0")
                .media
                  .media-left
                    span.icon.is-large
                      i.fa.fa-exclamation-circle.fa-3x
                  .media-content
                    | Por favor, selecione algum curso disponível.
              .control(:class="{'is-loading': loading }")
                label.l-checkbox
                  input(type="checkbox", value="educacao-ambiental", v-model="form.courses")
                  i.fa.fa-check.l-warning
                  span Educação - Educação Ambiental com ênfase em Documento Sustentável
                label.l-checkbox
                  input(type="checkbox", value="arte-educacao-terapia", v-model="form.courses")
                  i.fa.fa-check.l-warning
                  span Educação - Arte, Educação e Terapia
                label.l-checkbox
                  input(type="checkbox", value="docencia", v-model="form.courses")
                  i.fa.fa-check.l-warning
                  span Educação - Docência no Ensino Superior
                label.l-checkbox
                  input(type="checkbox", value="educacao-especial", v-model="form.courses")
                  i.fa.fa-check.l-warning
                  span Educação - Educação Especial
                label.l-checkbox
                  input(type="checkbox", value="eja", v-model="form.courses")
                  i.fa.fa-check.l-warning
                  span Educação - Educação de Jovens e Adultos
                label.l-checkbox
                  input(type="checkbox", value="gestao-escolar", v-model="form.courses")
                  i.fa.fa-check.l-warning
                  span Educação - Gestão Escolar
                label.l-checkbox
                  input(type="checkbox", value="psicomotricidade", v-model="form.courses")
                  i.fa.fa-check.l-warning
                  span Educação - Psicomotricidade
                label.l-checkbox
                  input(type="checkbox", value="psicopedagogia-clinica", v-model="form.courses")
                  i.fa.fa-check.l-warning
                  span Educação - Psicopedagogia Clínica
                label.l-checkbox
                  input(type="checkbox", value="psicopedagogia-institucional", v-model="form.courses")
                  i.fa.fa-check.l-warning
                  span Educação - Psicopedagogia Institucional
                label.l-checkbox
                  input(type="checkbox", value="tgd", v-model="form.courses")
                  i.fa.fa-check.l-warning
                  span Educação - Transtorno Global de Desenvolvimento
                label.l-checkbox
                  input(type="checkbox", value="gestao-publica", v-model="form.courses")
                  i.fa.fa-check.l-warning
                  span MBA - Gestão Pública
            .field
              .control(:class="{'is-loading': loading }")
                label.l-checkbox
                  input(checked, type="checkbox", name="accepted" :class="{ 'is-danger': errors.has('accepted') }", v-model="form.accepted", v-validate="'required'")
                  i.fa.fa-check.l-success
                  span Aceito ser contactado(a)
                span.help.is-danger(v-if="errors.has('accepted')") Você deve aceitar para que entremos em contato.
            div(netlify-recaptcha)
            .field.is-grouped.is-grouped-right
              p.control.is-expanded
                a.button.is-text(href="https://github.com/derevandal/idepead-website-facon" target="_blank" style="text-decoration: none")
                  span.icon.is-left
                    i.fa.fa-github
                  span André Van Dal
              p.control
                button.button.is-facon-yellow(type="submit" :class="{'is-loading': loading }")
                  | Enviar mensagem


</template>

<style lang="scss">
* {
  box-sizing: border-box;
}
html,
body {
  overflow: auto;
}
.hero-body {
  padding: 0;
}
.fa-3x {
  font-size: 3em;
}
.developed {
  align-self: center;
}

.l-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;

  input[type="checkbox"] {
    display: none;
    &:checked + i.l-success {
      color: white;
      background-color: #5cb85c;
      border-color: #5cb85c;
    }

    &:checked + i.l-warning {
      color: white;
      background-color: #f1ab41;
      border-color: #f1ab41;
    }
  }

  i {
    content: "";
    display: block;
    min-width: calc(1em + 2px);
    height: calc(1em + 2px);
    padding: 2px;
    margin-right: 0.5em;
    border: 1px solid #dbdbdb;
    font-size: 1em;
    color: transparent;
    position: relative;
    &:before {
      position: absolute;
      top: calc(50% - 0.5em);
      left: calc(50% - 0.5em);
    }
    transition: all ease-in-out 0.1s;
  }
}
</style>

<script>
import { mask } from "vue-the-mask"

export default {
  head: {
    title: "Inscreva-se - FACON"
  },
  name: "SubscriptionPage",
  directives: { mask },
  data() {
    return {
      loading: false,
      sended: false,
      error: false,
      noCourseSelected: false,
      form: {
        name: "",
        phone: "",
        cpf: "",
        email: "",
        courses: [],
        accepted: true
      }
    }
  },
  methods: {
    validateBeforeSubmit() {
      this.loading = true
      if (this.form.courses.length === 0) {
        this.noCourseSelected = true
        this.loading = false
      } else {
        this.$validator.validateAll().then(result => {
          if (result) {
            const encode = data => {
              return Object.keys(data)
                .map(
                  key =>
                    encodeURIComponent(key) +
                    "=" +
                    encodeURIComponent(data[key])
                )
                .join("&")
            }
            let body = encode({
              "form-name": "subscription",
              ...this.form
            })
            fetch("/send", {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: body
            })
              .then(response => {
                if (!response.ok) {
                  throw Error(response.statusText)
                }
                return response
              })
              .then(() => {
                this.sended = true
                this.form = {
                  name: "",
                  phone: "",
                  cpf: "",
                  email: "",
                  courses: [],
                  accepted: true
                }
                this.$validator.pause()
                this.$nextTick(() => {
                  this.$validator.errors.clear()
                  this.$validator.fields.items.forEach(field => field.reset())
                  this.$validator.fields.items.forEach(field =>
                    this.errors.remove(field)
                  )
                  this.$validator.resume()
                })
              })
              .catch(() => {
                this.error = true
              })
              .finally(() => {
                this.loading = false
              })
          }
        })
      }
    }
  }
}
</script>
