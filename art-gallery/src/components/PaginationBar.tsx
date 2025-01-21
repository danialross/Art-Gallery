import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type PaginationBarProps = {
  totalNumPages: number;
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
};

const PaginationBar = ({
  page,
  setPage,
  totalNumPages,
}: PaginationBarProps) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant={"outline"}
            onClick={() => setPage((page) => page - 1)}
            disabled={page === 1}
            className={"text-small sm:text-medium"}
          >
            <ChevronLeft /> Previous
          </Button>
        </PaginationItem>
        {page > 2 && (
          <>
            <PaginationItem>
              <Button
                variant={"outline"}
                onClick={() => setPage(1)}
                className={"text-small sm:text-medium"}
              >
                1
              </Button>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <p className={"p-2 underline text-small sm:text-medium"}>{page}</p>
        </PaginationItem>

        {totalNumPages && page < totalNumPages - 1 && (
          <>
            <PaginationItem>
              <PaginationEllipsis className={"text-small sm:text-medium"} />
            </PaginationItem>
            <PaginationItem>
              <Button
                variant={"outline"}
                onClick={() => setPage(totalNumPages)}
                className={"text-small sm:text-medium"}
              >
                {totalNumPages}
              </Button>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <Button
            variant={"outline"}
            onClick={() => setPage((page) => page + 1)}
            disabled={page === totalNumPages}
            className={"text-small sm:text-medium"}
          >
            Next <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationBar;
