'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation";



const DeleteDestinationsDialog = ({id}:{id:string}) => {
    const handleDeleteDestinations = async ()=>{
        const res = await fetch(`http://localhost:5000/destinations/${id}`,{
            method : "DELETE",
          
        });
         await res.json()
        

        redirect('/all-destinations')
    }




  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger
          render={
            <Button
            

              variant="outline"
              className="rounded-full border-red-200 px-4 text-xs font-medium text-red-500 shadow-sm hover:bg-red-50 hover:text-red-600"
            >
                <Trash2></Trash2>
              Delete
            </Button>
          }
        >
          Show Dialog
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteDestinations}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteDestinationsDialog;
