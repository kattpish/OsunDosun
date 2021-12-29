import { createClient } from "@supabase/supabase-js";
// see documention about using .env variables
// https://remix.run/docs/en/v1/guides/envvars#server-environment-variables
const supabaseUrl = 'https://ojetdodwhkhfmybercjp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDcxNDA4MSwiZXhwIjoxOTU2MjkwMDgxfQ.06PvzEm3V0f4CsqXmdOHW2T1b7HB7OD-JwIBpJl9MLM';

export const supabaseClient = createClient(supabaseUrl, supabaseKey);