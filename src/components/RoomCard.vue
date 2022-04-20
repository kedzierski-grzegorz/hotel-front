<template>
    <v-card
    >
    <!-- Here wil be room photo -->
        <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        ></v-img>

        <v-card-title>
            {{ this.rooms.title }}
        </v-card-title>

        <v-card-subtitle>
            {{ this.rooms.description }}
        </v-card-subtitle>

        <v-card-text>
            <v-row
                align="center"
                class="mx-0"
            >
                <v-rating
                    v-model=this.rooms.rating
                    color="amber"
                    half-increments
                    length="5"
                    readonly
                    size="20"
                ></v-rating>
                <div class="grey--text ms-4">
                    {{ this.rooms.rating }} ({{ this.rooms.countOfRatings }})
                </div>
            </v-row>
        </v-card-text>

        <v-card-text>
            <v-row
                align="center"
                class="mx-0"
            >
                <p class="font-weight-black">
                    $ {{ this.rooms.price }}
                </p>
                /night
            </v-row>
        </v-card-text>

        <v-card-actions>
            <v-btn text>
                More
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
                icon
                @click="show = !show"
            >
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
        </v-card-actions>

        <v-expand-transition>
            <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                    {{ this.rooms.extendedDescription }}
                </v-card-text>
            </div>
        </v-expand-transition>
    </v-card>
</template>

<script>
export default {
    props: ['rooms'],
    data: () => ({
        show: false,
    }),
}
</script>