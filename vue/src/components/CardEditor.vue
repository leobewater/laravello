<template>
  <div>
    <textarea
      class="rounded-md shadow-card py-1 px-2 outline-none w-full text-gray-900 text-sm bg-white h-16 resize-none"
      placeholder="Enter a title for this card..."
      v-model.trim="title"
      @keyup.esc="closed"
      @keyup.enter="addCard"
    ></textarea>
    <div class="flex">
      <button
        @click="addCard"
        class="rounded-sm py-1 px-3 bg-indigo-700 text-white cursor-pointer hover:bg-indigo-600 outline-none"
      >
        Add Card
      </button>
      <button
        @click="closed"
        class="py-1 px-3 ml-1 rounded-md hover:bg-gray-400 cursor-pointer text-gray-500"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineEmits } from "vue";
import CreateCard from "../gql/mutations/CreateCard.gql";
import BoardQuery from "../gql/queries/BoardWithListsAndCards.gql";
import { useMutation } from "@vue/apollo-composable";
import produce from "immer";

const emit = defineEmits(["closed"]);
const props = defineProps({
  list: Object,
});

const title = ref("");

onMounted(() => {
  // adding ref="title" to the textarea doesn't work with v-model.
  // title.value.focus();
});

const { mutate: createCard } = useMutation(CreateCard, () => ({
  variables: {
    listId: props.list.id,
    title: title.value,
    order: props.list.cards.length + 1,
    owner_id: 1,
  },
  // refetchQueries: [
  //   { query: BoardQuery, variables: { id: props.list.board_id } },
  // ],
  // Or
  // add new card to the cached query without making extra api call
  update: (cache, { data: { createCard } }) => {
    // console.log(title.value)
    // console.log(props.list.id)
    // console.log(props.list.board_id)

    // read the cached query
    const data = cache.readQuery({
      query: BoardQuery,
      variables: { id: parseInt(props.list.board_id) },
    });
    console.log(createCard);

    // console.log(data)
    cache.writeQuery({
      query: BoardQuery,
      data: produce(data, (x) => {
        // console.log(x)
        // push new card to the list
        x.board.lists
          .find((itemList) => itemList.id === props.list.id)
          .cards.push(createCard);
      }),
    });
  },
}));

function addCard() {
  createCard();
  closed();
}

function closed() {
  emit("closed");
}
</script>
