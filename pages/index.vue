<template lang="pug">
section.hero.is-facon.is-bold.is-fullheight
  .hero-body
    .container
      .column.is-6.is-offset-3
        h1.title
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
              article.notification.is-warning(v-if="noCourseSelected && this.form.courses.length > 0")
                .media
                  .media-left
                    span.icon.is-large
                      i.fa.fa-exclamation-circle.fa-3x
                  .media-content
                    | Por favor, selecione algum curso disponível.
              .control
                .pretty.p-default.p-fill.p-icon
                  input#arte-educacao-terapia(checked='', type='checkbox', value="arte-educacao-terapia", v-model="form.courses")
                  .state.p-warning
                    i.fa.fa-check.icon
                    label(for='arte-educacao-terapia')
                      | Educação - Arte, Educação e Terapia
                .pretty.p-default.p-fill.p-icon
                  input#docencia(checked='', type='checkbox', value="docencia", v-model="form.courses")
                  .state.p-warning
                    i.fa.fa-check.icon
                    label(for='docencia')
                      | Educação - Docência no Ensino Superior
                .pretty.p-default.p-fill.p-icon
                  input#educacao-ambiental(checked='', type='checkbox', value="educacao-ambiental", v-model="form.courses")
                  .state.p-warning
                    i.fa.fa-check.icon
                    label(for='educacao-ambiental')
                      | Educação - Educação Ambiental
                .pretty.p-default.p-fill.p-icon
                  input#educacao-especial(checked='', type='checkbox', value="educacao-especial", v-model="form.courses")
                  .state.p-warning
                    i.fa.fa-check.icon
                    label(for='educacao-especial')
                      | Educação - Educação Especial
                .pretty.p-default.p-fill.p-icon
                  input#eja(checked='', type='checkbox', value="eja", v-model="form.courses")
                  .state.p-warning
                    i.fa.fa-check.icon
                    label(for='eja')
                      | Educação - Educação de Jovens e Adultos
                .pretty.p-default.p-fill.p-icon
                  input#gestao-escolar(checked='', type='checkbox', value="gestao-escolar", v-model="form.courses")
                  .state.p-warning
                    i.fa.fa-check.icon
                    label(for='gestao-escolar')
                      | Educação - Gestão Escolar
                .pretty.p-default.p-fill.p-icon
                  input#psicomotricidade(checked='', type='checkbox', value="psicomotricidade", v-model="form.courses")
                  .state.p-warning
                    i.fa.fa-check.icon
                    label(for='psicomotricidade')
                      | Educação - Psicomotricidade
                .pretty.p-default.p-fill.p-icon
                  input#psicopedagogia-clinica(checked='', type='checkbox', value="psicopedagogia-clinica", v-model="form.courses")
                  .state.p-warning
                    i.fa.fa-check.icon
                    label(for='psicopedagogia-clinica')
                      | Educação - Psicopedagogia Clínica
                .pretty.p-default.p-fill.p-icon
                  input#psicopedagogia-institucional(checked='', type='checkbox', value="psicopedagogia-institucional", v-model="form.courses")
                  .state.p-warning
                    i.fa.fa-check.icon
                    label(for='psicopedagogia-institucional')
                      | Educação - Psicopedagogia Institucional
                .pretty.p-default.p-fill.p-icon
                  input#tgd(checked='', type='checkbox', value="tgd", v-model="form.courses")
                  .state.p-warning
                    i.fa.fa-check.icon
                    label(for='tgd')
                      | Educação - Transtorno Global de Desenvolvimento
                .pretty.p-default.p-fill.p-icon
                  input#gestao-publica(checked='', type='checkbox', value="gestao-publica", v-model="form.courses")
                  .state.p-warning
                    i.fa.fa-check.icon
                    label(for='gestao-publica')
                      | MBA - Gestão Pública
            .field
              .control(:class="{'is-loading': loading }")
                .pretty.p-default.p-fill.p-icon
                  input#accepted(checked, name="accepted" :class="{ 'is-danger': errors.has('accepted') }", type='checkbox', value="accepted", v-model="form.accepted", v-validate="'required'")
                  .state.p-success
                      i.fa.fa-check.icon
                      label(for='accepted')
                        | Aceito ser contactado(a)
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

.pretty {
  min-width: 100%;
  white-space: wrap;
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
      this.$validator.validateAll().then(result => {
        if (result && this.form.courses.length > 0) {
          const encode = data => {
            return Object.keys(data)
              .map(
                key =>
                  encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
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
              this.form = {}
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
        } else {
          this.noCourseSelected = true
          this.loading = false
        }
      })
    }
  }
}
</script>
