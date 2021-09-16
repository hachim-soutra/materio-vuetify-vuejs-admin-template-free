<template>
  <v-row>
    <!-- basic -->
    <v-col cols="12">
      <v-card>
        <v-card-title>Basic</v-card-title>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="4"
              md="2"
            >
              <v-text-field
                label="Date creation"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="4"
              md="2"
            >
              <v-text-field
                label="client"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="4"
              md="2"
            >
              <v-text-field
                label="produit"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="4"
              md="2"
            >
              <v-select
                v-model="statut"
                required
                :items="status"
                item-text="name"
                item-value="id"

                label="Command status"
              ></v-select>
            </v-col>
            <v-col
              cols="12"
              sm="4"
              md="2"
            >
              <v-text-field
                label="pays"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="4"
              md="2"
            >
              <v-text-field
                label="partenaire"
              ></v-text-field>
            </v-col>
            <!-- <v-col
              cols="12"
              sm="4"
              md="2"
            >
              <v-btn
                block
                color="primary"
                class="mt-6"
                @click="submit"
              >
                Recherche
              </v-btn>
            </v-col> -->
          </v-row>
        </v-container>
        <v-card-body>
          <v-data-table
            :headers="fields"
            :items="items"
            :single-expand="singleExpand"
            :expanded.sync="expanded"
            item-key="name"
            show-expand
            class="elevation-1"
            :items-per-page="50"
            :search="search"
            :loading="loading"
            loading-text="Loading..."
            @click:row="expandRow"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>list command valider pendant 72h</v-toolbar-title>
                <v-spacer></v-spacer>
                <br>
                <v-text-field
                  v-model="search"
                  label="Search"
                  class="px-4"
                ></v-text-field>
              </v-toolbar>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <div class="container-fluid">
                  <v-form
                    class="row"
                    @submit.prevent="updateorder(item)"
                  >
                    <div class="col-12 col-md-8">
                      <v-card :heading="`Order detail #${form.id}`">
                        <!-- /.card-header -->
                        <div class="card-body table-responsive p-0">
                          <v-row>
                            <v-col cols="12">
                              <v-simple-table>
                                <template v-slot:default>
                                  <thead>
                                    <tr dark>
                                      <th>upsell</th>
                                      <th>product</th>
                                      <th>Unit Cost</th>
                                      <th>Quantity</th>
                                      <th>Subtotal</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr
                                      v-for="(row, index) in form.rows"
                                      :key="row.$key"
                                    >
                                      <td>
                                        <v-checkbox
                                          v-model="form.rows[index].active"
                                          @change="quantityHandler(index)"
                                        ></v-checkbox>
                                      </td>
                                      <td>
                                        <v-select
                                          v-model="form.rows[index].id"
                                          :items="product_array"
                                          item-value="id"
                                          item-text="text"
                                          outlined
                                          dense
                                          @change="produitHandler(index)"
                                        >
                                        </v-select>
                                      </td>
                                      <td>
                                        <v-text-field
                                          v-model="form.rows[index].unit_cost"
                                          filled
                                          type="number"
                                          background-color="transparent"
                                          @change="quantityHandler(index)"
                                        ></v-text-field>
                                      </td>
                                      <td>
                                        <v-text-field
                                          v-model="form.rows[index].quantity"
                                          filled
                                          type="number"
                                          background-color="transparent"
                                          @change="quantityHandler(index)"
                                        ></v-text-field>
                                      </td>
                                      <td>
                                        <v-text-field
                                          v-model="form.rows[index].sub_total"
                                          filled
                                          type="number"
                                          disabled
                                          background-color="transparent"
                                        ></v-text-field>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        colspan="5"
                                        class="float-right"
                                      >
                                        <v-btn
                                          class="ma-2 float-right"
                                          color="red"
                                          dark
                                          @click="addProduit"
                                        >
                                          Add produit
                                        </v-btn>
                                      </td>
                                    </tr>
                                  </tbody>
                                </template>
                              </v-simple-table>
                            </v-col>
                            <div class="col-6">
                              <div class="form-group col-12">
                                <v-textarea
                                  v-model="form.note"
                                  filled
                                  rows="3"
                                  label="Note"

                                  background-color="transparent"
                                ></v-textarea>
                                <v-select
                                  v-model="form.order_status_id"
                                  :items="status"
                                  label="Status"
                                  item-value="id"
                                  item-text="name"
                                  outlined
                                  dense
                                ></v-select>
                              </div>
                            </div>
                            <div class="col-6">
                              <div class="form-group col-12">
                                <v-textarea
                                  v-model="form.delivery_note"
                                  filled
                                  rows="3"
                                  label="Delivery service note"
                                  background-color="transparent"
                                ></v-textarea>
                              </div>
                              <v-simple-table>
                                <template v-slot:default>
                                  <tbody>
                                    <tr>
                                      <td>subTotal</td>
                                      <td class="font-weight-medium">
                                        {{ form.subTotal }}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Total</td>
                                      <td class="font-weight-medium">
                                        {{ form.total }}
                                      </td>
                                    </tr>
                                  </tbody>
                                </template>
                              </v-simple-table>
                            </div>
                          </v-row>
                        </div>
                      </v-card>
                    </div>
                    <div class="col-12 col-md-4">
                      <v-card :heading="`Customer Details`">
                        <div class="card-body table-responsive p-0">
                          <v-row>
                            <v-col
                              cols="12"
                              sm="6"
                            >
                              <v-text-field
                                v-model="form.consumer.prenom"
                                label="prenom"
                                filled
                                background-color="transparent"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                            >
                              <v-text-field
                                v-model="form.consumer.nom"
                                label="nom"
                                filled
                                background-color="transparent"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                            >
                              <v-text-field
                                v-model="form.consumer.phone"
                                label="phone"
                                filled
                                background-color="transparent"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                            >
                              <v-text-field
                                v-model="form.consumer.ville"
                                label="ville"
                                filled
                                background-color="transparent"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-textarea
                                v-model="form.consumer.adresse"
                                label="Adresse"
                                filled
                                rows="3"
                                background-color="transparent"
                              ></v-textarea>
                            </v-col>
                          </v-row>
                        </div>
                      </v-card>
                    </div>
                    <v-card-actions class="col-12">
                      <v-btn
                        type="submit"
                        color="primary"
                      >
                        Mise a jour
                      </v-btn>
                    </v-card-actions>
                  </v-form>
                </div>
              </td>
            </template>
          </v-data-table>
        </v-card-body>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Form from 'vform'
import ApiService from '@/services/api.service'

export default {
  name: 'Users',
  data() {
    return {
      consumer_array: null,
      listConsumer: [],
      product_array: null,
      items: [],
      original: null,
      urlData: null,
      statut: null,
      status: [],
      desserts: [],
      fields: [
        {
          text: 'Id',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Client', value: 'consumer_name' },
        { text: 'Date', value: 'created_at' },
        { text: 'Produit', value: 'product_name' },
        { text: 'Montant', value: 'total' },
        { text: 'telephone', value: 'consumer.phone' },
        { text: 'Adresse', value: 'shipping_adresse' },
        { text: 'Staus', value: 'statusName' },
      ],
      loading: true,
      search: '',
      expanded: [],
      singleExpand: true,
      form: new Form({
        id: '',
        quantity: '',
        datetime: '',
        subTotal: '',
        total: '',
        dateConfirmation: '',
        status: '',
        contact_id: null,
        consumer: {
          nom: '',
          prenom: '',
          adresse: '',
          ville: '',
          phone: '',
        },
        rows: [],
        shipping_id: null,
        shipping_cost: null,
        shipping_adresse: null,
        delivery_note: null,
        note: null,
        consumer_id: '',
      }),
    }
  },
  created() {
    this.urlData = `${this.$app_url}/api/order`
    this.fechData(this.urlData)
    this.fetchStatus()
  },
  methods: {
    fetchStatus() {
      ApiService.get(`${this.$app_url}/api/orderStatus`).then(({ data }) => {
        this.status = data.data
      })
    },
    update(item) {
      ApiService
        .put(`${this.$app_url}/api/order/status/${item.id}`, { order_status_id: item.status })
        .then(data => {
          if (data.data.success) {
            // toast
            // eslint-disable-next-line no-undef
            Toast.fire({
              icon: 'success',
              title: data.data.message,
            })
            this.fechData()
          } else {
            // eslint-disable-next-line no-undef
            Toast.fire({
              icon: 'error',
              title: data.data.message,
            })
          }
        })
        .catch(error => {
          // eslint-disable-next-line no-undef
          Toast.fire({
            icon: 'error',
            title: error.response.data.message,
          })
        })
    },
    rowClicked(item) {
      this.$router.push({ name: 'Order.show', params: { id: item.id } })
    },
    pageChange(val) {
      this.$router.push({ query: { page: val } })
    },
    fechData(url = this.urlData) {
      this.loading = true
      ApiService.get(url).then(data => {
        this.items = data.data.data
      }).finally(() => {
        this.loading = false
      })
    },
    updateorder() {
      ApiService.put(`${this.$app_url}/api/order/${this.form.id}`, this.form)
        .then(data => {
          this.$toast.fire({
            icon: 'success',
            title: data.data.message,
          })

          this.$router.go(0)
        })
        .catch(error => {
          this.$toast.fire({
            icon: 'error',
            title: error.response.data.message,
          })
        })
    },

    // eslint-disable-next-line camelcase
    loadProducts(contact_id) {
      this.product_array = []
      // eslint-disable-next-line camelcase
      ApiService.get(`${this.$app_url}/api/products/list/${contact_id}`)
        .then(response => {
          this.product_array = response.data.data.map(a => ({ text: a.name, id: a.id }))
        })
        .catch(() => console.warn('Oh. Something went wrong'))
    },
    loadconsumers() {
      ApiService.get(`${this.$app_url}/api/consumers/list`)
        .then(response => {
          this.listConsumer = response.data.data
          this.consumer_array = response.data.data.map(a => ({ text: `${a.nom} ${a.prenom}`, id: a.id }))
        })
        .catch(() => console.warn('Oh. Something went wrong'))
    },

    addProduit() {
      this.form.rows.push({
        id: this.form.rows.length,
        active: 0,
        product: null,
        unit_cost: 0,
        quantity: 0,
        sub_total: 0,
      })
    },

    deleteProduit(row) {
      this.form.rows.splice(row, 1)
      this.form.subTotal = this.form.rows.reduce((previous, current) => previous + current.sub_total, 0)
      this.form.total = this.form.subTotal
    },

    quantityHandler(index) {
      this.form.rows[index].sub_total = this.form.rows[index].quantity * this.form.rows[index].unit_cost
      this.form.subTotal = this.form.rows.reduce((previous, current) => previous + current.sub_total, 0)
      this.form.total = this.form.subTotal
    },

    expandRow(value) {
      const index = this.expanded.indexOf(value)
      this.statusName = value.statusName
      this.form.id = value.id
      this.form.subTotal = value.subTotal
      this.form.total = value.total
      this.form.order_status_id = value.status
      this.form.consumer_id = value.consumer.id
      this.form.contact_id = value.contact.id
      this.form.consumer.nom = value.consumer.nom
      this.form.consumer.prenom = value.consumer.prenom
      this.form.consumer.adresse = value.consumer.adresse
      this.form.consumer.ville = value.consumer.ville
      this.form.consumer.phone = value.consumer.phone

      this.form.shipping_id = value.shipping_id
      this.form.note = value.note.note
      this.form.shipping_adresse = value.shipping_adresse
      this.form.delivery_note = value.note.delivery_note
      this.form.rows = []
      // eslint-disable-next-line no-restricted-syntax
      for (const item of value.product_array) {
        this.form.rows.push({
          id: item.id,
          active: item.active,
          product: item.product,
          unit_cost: item.unit_cost,
          quantity: item.quantity,
          sub_total: item.sub_total,
        })
      }
      this.loadProducts(value.contact.id)
      if (index === -1) {
        this.expanded.push(value)
      } else {
        this.expanded.splice(index, 1)
      }
    },

    filterOnlyCapsText(value, search, item) {
      console.log(item)

      return value != null
          && search != null
          && typeof value === 'string'
          && value.toString().indexOf(search) !== -1
    },

  },
}
</script>
