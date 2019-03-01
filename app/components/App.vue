<template>
    <Page>
        <ActionBar title="Tom's App"/>

        <GridLayout columns="*" rows="*">
            <StackLayout>
                <RadAutoCompleteTextView ref="from"
                                         class="searchTextField"
                                         displayMode="plain"
                                         suggestMode="Suggest"
                                         :completionMode="completionMode"
                                         :items="fromItems">
                    <SuggestionView ~suggestionView suggestionViewHeight="300">
                        <StackLayout v-suggestionItemTemplate orientation="vertical" padding="10">
                            <v-template>
                                <Label :text="item.text"></Label>
                            </v-template>
                        </StackLayout>
                    </SuggestionView>
                </RadAutoCompleteTextView>
                <RadAutoCompleteTextView ref="to"
                                         class="searchTextField"
                                         displayMode="plain"
                                         suggestMode="Suggest"
                                         :completionMode="completionMode"
                                         :items="toItems">
                    <SuggestionView ~suggestionView suggestionViewHeight="300">
                        <StackLayout v-suggestionItemTemplate orientation="vertical" padding="10">
                            <v-template>
                                <Label :text="item.text"></Label>
                            </v-template>
                        </StackLayout>
                    </SuggestionView>
                </RadAutoCompleteTextView>
                <Button class="search-button" text="Search" @tap="onSearch"/>
            </StackLayout>
        </GridLayout>
    </Page>
</template>


<script>
	import {ObservableArray} from "tns-core-modules/data/observable-array";
	import {TokenModel} from "nativescript-ui-autocomplete";
	import { CompletionMode } from 'nativescript-ui-autocomplete';
	import * as http from 'tns-core-modules/http';

	import Search from "./Search"
	import config from "../config"

	export default {
		data() {
			return {
				location: "",
				completionMode: CompletionMode.Contains,
				fromItems: new ObservableArray(),
				toItems: new ObservableArray()
			}
		},

		mounted() {
			this.$refs.from.setLoadSuggestionsAsync(this.loadAutocompleteDestinations);


			this.$refs.to.setLoadSuggestionsAsync(this.loadAutocompleteDestinations);
		},

		methods: {

			loadAutocompleteDestinations(text) {
				const promise = new Promise((resolve, reject) => {
					http.request({
						url: config.placesUrl + text,
						method: "GET",
						headers: config.requestHeader
					}).then((response) => {
						var content = response.content.toJSON();
						var places = content.Places;
						const items = new Array();
						for (let i = 0; i < places.length; i++) {
							items.push(new TokenModel(places[i].PlaceName, null));
						}
						resolve(items);
					}).catch((err) => {
						const message = `Error fetching remote data from ${jsonUrl}: ${err.message}`;
						console.log(message);
						alert(message);
						reject();
					});
				});

				return promise;
			},

			onSearch() {
				console.log(this.$refs.autocomplete);
			}
		},
		components: {Search},
	}
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .search-button{
        background-color: #D6E4EC;
        color: #456472;
        width:300px;
    }

    .searchTextField {
        font-weight: 300;
        font-size: 18px;
        padding: 15px 20px;
    }

</style>
