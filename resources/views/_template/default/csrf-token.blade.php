<?php $token = csrf_token() ?>
<meta name="csrf-token" content="{{ $token }}">
<script>
    window.Laravel = {!! json_encode(['csrfToken' => $token]) !!}
</script>
